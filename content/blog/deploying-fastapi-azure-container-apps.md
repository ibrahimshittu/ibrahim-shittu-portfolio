---
title: "Deploying FastAPI to Azure Container Apps with Key Vault, Container Registry, and GitHub Actions"
excerpt: "A comprehensive guide to deploying FastAPI applications using Azure Container Apps, Key Vault for secrets management, Container Registry for images, and GitHub Actions for CI/CD automation."
date: 2025-02-3
readTime: "15 min read"
image: "https://res.cloudinary.com/dud5rx9vj/image/upload/v1737049200/azure-container-apps-deployment.jpg"
tags:
  [
    "azure",
    "fastapi",
    "key-vault",
    "container-apps",
    "container-registry",
    "github-actions",
    "devops",
  ]
---

In this tutorial, we'll deploy a FastAPI application to Azure Container Apps using a complete DevOps pipeline. We'll leverage Azure Key Vault for secure secrets management, Azure Container Registry for container images, and GitHub Actions for automated CI/CD.

By the end of this tutorial, you'll have a production-ready deployment that demonstrates modern cloud-native practices with Azure's serverless container platform.

## Objectives

In this tutorial, you will:

1. Create a minimal FastAPI application
2. Set up Azure Container Registry for image storage
3. Configure Azure Key Vault for secrets management
4. Deploy to Azure Container Apps with auto-scaling
5. Implement a complete CI/CD pipeline with GitHub Actions
6. Apply production security and monitoring practices

## Prerequisites

Before starting, ensure you have:

- Python 3.11 or later
- Docker Desktop
- Azure CLI (`az`)
- Git
- A GitHub account
- An Azure subscription with appropriate permissions

Verify your installations:

```bash
python --version
docker --version
az --version
git --version
```

## Project Setup

Let's start by creating our project structure and FastAPI application.

### Create Project Structure

```bash
mkdir fastapi-azure-demo
cd fastapi-azure-demo
git init
```

Create the following structure:

```text
fastapi-azure-demo/
├── app/
│   └── main.py
├── tests/
│   └── test_main.py
├── .github/
│   └── workflows/
│       └── deploy.yml
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

### FastAPI Application

Create `app/main.py`:

```python
from fastapi import FastAPI
import os
from datetime import datetime

app = FastAPI(title="Azure Demo API", version="1.0.0")

@app.get("/")
def read_root():
    return {
        "message": "Hello from Azure Container Apps!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/config")
def get_config():
    # Demonstrate reading secrets from Key Vault (via environment variables)
    return {
        "database_configured": bool(os.getenv("DATABASE_URL")),
        "api_key_configured": bool(os.getenv("API_KEY")),
        "environment": os.getenv("ENVIRONMENT", "development")
    }
```

### Test Script

Create `tests/test_main.py`:

```python
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    """Test the root endpoint returns expected response."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "timestamp" in data
    assert "version" in data
    assert data["message"] == "Hello from Azure Container Apps!"
    assert data["version"] == "1.0.0"

def test_health_endpoint():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "timestamp" in data
    assert "environment" in data
    assert data["status"] == "healthy"
    assert data["environment"] == "development"

def test_config_endpoint():
    """Test the configuration endpoint."""
    response = client.get("/config")
    assert response.status_code == 200
    data = response.json()
    assert "database_configured" in data
    assert "api_key_configured" in data
    assert "environment" in data
    assert isinstance(data["database_configured"], bool)
    assert isinstance(data["api_key_configured"], bool)

def test_invalid_endpoint():
    """Test that invalid endpoints return 404."""
    response = client.get("/invalid")
    assert response.status_code == 404

if __name__ == "__main__":
    # Run tests with simple output when executed directly
    print("Running FastAPI tests...\n")

    test_functions = [
        test_root_endpoint,
        test_health_endpoint,
        test_config_endpoint,
        test_invalid_endpoint
    ]

    passed = 0
    failed = 0

    for test_func in test_functions:
        try:
            test_func()
            print(f"✅ {test_func.__name__}: PASSED")
            passed += 1
        except AssertionError as e:
            print(f"❌ {test_func.__name__}: FAILED - {e}")
            failed += 1
        except Exception as e:
            print(f"❌ {test_func.__name__}: ERROR - {e}")
            failed += 1

    print(f"\n{'='*50}")
    print(f"Results: {passed} passed, {failed} failed")
    print(f"{'='*50}")

    if failed > 0:
        exit(1)
    print("\n🎉 All tests passed!")
```

Create `requirements.txt`:

```text
fastapi==0.109.0
uvicorn[standard]==0.27.0
```

### Basic Files

Create `.gitignore`:

```text
__pycache__/
*.py[cod]
*.pyc
.env
.venv
venv/
.DS_Store
```

Create `.dockerignore`:

```text
__pycache__
*.pyc
.git
.gitignore
.env
README.md
.venv
venv/
```

## Containerizing the Application

Create a simple, production-ready Dockerfile:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health')" || exit 1

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Test the container locally:

```bash
# Build and test locally
docker build -t fastapi-demo .
docker run -d -p 8000:8000 --name test-app fastapi-demo

# Test endpoints
curl http://localhost:8000/
curl http://localhost:8000/health
curl http://localhost:8000/config

# Clean up
docker stop test-app && docker rm test-app
```

## Setting Up Azure Infrastructure

Now we'll create the Azure resources needed for our deployment.

### Login and Setup Variables

```bash
# Login to Azure
az login

# Set subscription (replace with your subscription ID)
az account set --subscription "your-subscription-id"

# Define variables
RESOURCE_GROUP="rg-fastapi-demo"
LOCATION="eastus"
ACR_NAME="acrfastapidemo$RANDOM"
KEYVAULT_NAME="kv-fastapi-demo-$RANDOM"
CONTAINER_APP_NAME="ca-fastapi-demo"
CONTAINER_APP_ENV="cae-fastapi-demo"
LOG_WORKSPACE="law-fastapi-demo"

echo "Resource Group: $RESOURCE_GROUP"
echo "ACR Name: $ACR_NAME"
echo "Key Vault: $KEYVAULT_NAME"
```

### Create Resource Group

```bash
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

### Create Azure Container Registry

```bash
# Create Container Registry
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $ACR_NAME \
  --sku Basic \
  --admin-enabled true

# Get registry credentials
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query loginServer --output tsv)
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)

echo "Registry Server: $ACR_LOGIN_SERVER"
echo "Username: $ACR_USERNAME"
echo "Password: $ACR_PASSWORD"
```

### Create Azure Key Vault

```bash
# Create Key Vault
az keyvault create \
  --name $KEYVAULT_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku standard

# Add example secrets
az keyvault secret set \
  --vault-name $KEYVAULT_NAME \
  --name "DATABASE-URL" \
  --value "postgresql://user:pass@host:5432/mydb"

az keyvault secret set \
  --vault-name $KEYVAULT_NAME \
  --name "API-KEY" \
  --value "super-secret-api-key-12345"

# Verify secrets
az keyvault secret list --vault-name $KEYVAULT_NAME --output table
```

### Create Log Analytics Workspace

```bash
# Create workspace for Container Apps logging
az monitor log-analytics workspace create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_WORKSPACE \
  --location $LOCATION

# Get workspace details
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_WORKSPACE \
  --query customerId --output tsv)

WORKSPACE_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_WORKSPACE \
  --query primarySharedKey --output tsv)
```

### Create Container Apps Environment

```bash
# Create Container Apps environment
az containerapp env create \
  --name $CONTAINER_APP_ENV \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --logs-workspace-id $WORKSPACE_ID \
  --logs-workspace-key $WORKSPACE_KEY
```

### Create Service Principal for GitHub Actions

```bash
# Create service principal for GitHub Actions
SUBSCRIPTION_ID=$(az account show --query id --output tsv)

az ad sp create-for-rbac \
  --name "sp-fastapi-demo-github" \
  --role "Contributor" \
  --scopes "/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP" \
  --sdk-auth
```

**Important**: Save the JSON output from the service principal creation. You'll need it for GitHub Actions.

## GitHub Actions CI/CD Pipeline

Now let's automate this entire process with GitHub Actions.

### GitHub Repository Setup

```bash
# Initialize git and create GitHub repo
git add .
git commit -m "Initial commit"

# Create GitHub repository (using GitHub CLI)
gh repo create fastapi-azure-demo --public --push
```

### Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `AZURE_CREDENTIALS`: The service principal JSON from earlier
- `ACR_NAME`: Your container registry name
- `ACR_USERNAME`: Container registry username
- `ACR_PASSWORD`: Container registry password
- `AZURE_SUBSCRIPTION_ID`: Your Azure subscription ID
- `AZURE_RESOURCE_GROUP`: Your resource group name
- `KEYVAULT_NAME`: Your Key Vault name

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure Container Apps

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  ACR_NAME: ${{ secrets.ACR_NAME }}
  IMAGE_NAME: fastapi-demo
  CONTAINER_APP_NAME: ca-fastapi-demo
  CONTAINER_APP_ENV: cae-fastapi-demo
  RESOURCE_GROUP: ${{ secrets.AZURE_RESOURCE_GROUP }}

jobs:
  test:
    name: Test Application
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install pytest httpx

      - name: Run tests with pytest
        run: |
          pytest tests/ -v --tb=short

  build:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Login to Azure Container Registry
        run: az acr login --name ${{ secrets.ACR_NAME }}

      - name: Build and push Docker image
        run: |
          IMAGE_TAG=${{ secrets.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}
          LATEST_TAG=${{ secrets.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:latest

          docker build -t $IMAGE_TAG -t $LATEST_TAG .
          docker push $IMAGE_TAG
          docker push $LATEST_TAG

          echo "IMAGE_TAG=$IMAGE_TAG" >> $GITHUB_ENV

  deploy:
    name: Deploy to Azure Container Apps
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Get secrets from Key Vault
        id: keyvault
        run: |
          DATABASE_URL=$(az keyvault secret show \
            --vault-name ${{ secrets.KEYVAULT_NAME }} \
            --name DATABASE-URL \
            --query value --output tsv)

          API_KEY=$(az keyvault secret show \
            --vault-name ${{ secrets.KEYVAULT_NAME }} \
            --name API-KEY \
            --query value --output tsv)

          # Mask secrets in logs
          echo "::add-mask::$DATABASE_URL"
          echo "::add-mask::$API_KEY"

          # Set outputs
          echo "DATABASE_URL=$DATABASE_URL" >> $GITHUB_OUTPUT
          echo "API_KEY=$API_KEY" >> $GITHUB_OUTPUT

      - name: Deploy to Container Apps
        run: |
          IMAGE_TAG=${{ secrets.ACR_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}

          echo "🚀 Deploying to Azure Container Apps..."

          az containerapp up \
            --name ${{ env.CONTAINER_APP_NAME }} \
            --resource-group ${{ env.RESOURCE_GROUP }} \
            --environment ${{ env.CONTAINER_APP_ENV }} \
            --image $IMAGE_TAG \
            --target-port 8000 \
            --ingress external \
            --registry-server ${{ secrets.ACR_NAME }}.azurecr.io \
            --registry-username ${{ secrets.ACR_USERNAME }} \
            --registry-password ${{ secrets.ACR_PASSWORD }} \
            --env-vars \
              DATABASE_URL="${{ steps.keyvault.outputs.DATABASE_URL }}" \
              API_KEY="${{ steps.keyvault.outputs.API_KEY }}" \
              ENVIRONMENT=production \
              VERSION=${{ github.sha }}

      - name: Get deployment URL and test
        run: |
          APP_URL=$(az containerapp show \
            --name ${{ env.CONTAINER_APP_NAME }} \
            --resource-group ${{ env.RESOURCE_GROUP }} \
            --query properties.configuration.ingress.fqdn \
            --output tsv)

          echo "🚀 Application deployed to: https://$APP_URL"

          # Wait for deployment to be ready
          echo "⏳ Waiting for deployment to be ready..."
          sleep 30

          # Test the deployment
          echo "🧪 Testing deployment..."
          curl -f https://$APP_URL/health || exit 1

          echo "✅ Deployment successful!"
          echo "🌐 App URL: https://$APP_URL"
          echo "📊 Health: https://$APP_URL/health"
          echo "⚙️ Config: https://$APP_URL/config"
```

## Testing the CI/CD Pipeline

Now let's test our complete pipeline:

```bash
# Make a small change to trigger deployment
echo "# FastAPI Azure Demo" > README.md
echo "This is a demo FastAPI app deployed to Azure Container Apps." >> README.md

# Commit and push
git add .
git commit -m "Add README and trigger deployment"
git push origin main
```

Go to your GitHub repository's Actions tab to watch the deployment process. The pipeline will:

1. **Test**: Run basic tests on the FastAPI application
2. **Build**: Build and push the Docker image to Azure Container Registry
3. **Deploy**: Deploy to Azure Container Apps with secrets from Key Vault

## Production Enhancements

### Enable Autoscaling

Configure HTTP-based autoscaling:

```bash
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --scale-rule-name http-rule \
  --scale-rule-type http \
  --scale-rule-http-concurrency 50 \
  --min-replicas 1 \
  --max-replicas 10
```

### Add Health Probes

```bash
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --health-probe-path /health \
  --health-probe-interval 30 \
  --health-probe-timeout 5
```

## Monitoring and Debugging

### View Application Logs

```bash
# Stream live logs
az containerapp logs show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --follow

# View recent logs
az containerapp logs show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --tail 100
```

### Check Container App Status

```bash
# View app details
az containerapp show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table

# View revisions
az containerapp revision list \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table

# View replicas
az containerapp replica list \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table
```

## Security Best Practices

### Use Managed Identity

Enable system-assigned managed identity for better security:

```bash
# Enable managed identity
az containerapp identity assign \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --system-assigned

# Get the identity principal ID
IDENTITY_ID=$(az containerapp identity show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query principalId --output tsv)

# Grant Key Vault access to the managed identity
az keyvault set-policy \
  --name $KEYVAULT_NAME \
  --object-id $IDENTITY_ID \
  --secret-permissions get list
```

### Network Security

For production deployments, consider using internal ingress:

```bash
# Update to internal ingress (requires VNet integration)
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --ingress internal
```

## Troubleshooting

### Common Issues

**1. Container App won't start:**

```bash
# Check revision status
az containerapp revision list \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP

# View detailed logs
az containerapp logs show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --tail 50
```

**2. Image pull failures:**

```bash
# Verify ACR credentials
az containerapp show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.registries

# Test ACR access
az acr repository list --name $ACR_NAME
```

**3. Key Vault access denied:**

```bash
# Check access policies
az keyvault show \
  --name $KEYVAULT_NAME \
  --query properties.accessPolicies

# Verify secrets exist
az keyvault secret list --vault-name $KEYVAULT_NAME
```

## Conclusion

We've successfully built a complete CI/CD pipeline for deploying FastAPI applications to Azure Container Apps. Our solution includes:

**Infrastructure Components:**

- **Azure Container Apps**: Serverless container hosting with auto-scaling
- **Azure Container Registry**: Secure, private container image storage
- **Azure Key Vault**: Centralized secrets management
- **Log Analytics**: Comprehensive logging and monitoring

**CI/CD Pipeline:**

- **Automated Testing**: Basic application testing before deployment
- **Container Building**: Automated Docker image building and pushing
- **Secure Deployment**: Automated deployment with secrets from Key Vault
- **Zero-Downtime Updates**: Rolling deployments with health checks

**Production Features:**

- Auto-scaling based on HTTP traffic
- Health probes for reliability
- Secure secrets management
- Comprehensive logging and monitoring

This architecture provides a solid foundation for deploying production FastAPI applications on Azure with modern DevOps practices. You can extend this setup by adding:

- Database integration (Azure Database for PostgreSQL/MySQL)
- Redis caching (Azure Cache for Redis)
- API Gateway (Azure API Management)
- Advanced monitoring (Application Insights)
- Multi-environment deployments (dev/staging/prod)

The complete source code is available in your GitHub repository, and the deployment pipeline will automatically handle future updates when you push changes to the main branch.

Happy deploying! 🚀
