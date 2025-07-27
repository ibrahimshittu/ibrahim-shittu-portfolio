# Ibrahim Shittu - Personal Website

A clean, minimal personal website built with Next.js 14 and TypeScript, following the exact design and structure of [self.so/ibrahim-shittu](https://www.self.so/ibrahim-shittu).

## 🚀 Features

- **Minimal Design**: Clean, professional single-page layout
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized for speed with Next.js 14 App Router
- **Type Safe**: Built with TypeScript for better development experience
- **Exact Match**: Follows the original self.so design precisely

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Single page with all content
├── public/               # Static assets
└── ...config files
```

## 🎨 Design Structure

The website follows the exact structure of the original self.so design:

1. **Header**: Name, location, social links, and profile photo
2. **About**: Brief professional description
3. **Work Experience**: Complete work history with descriptions
4. **Education**: University and degree information
5. **Skills**: Technology skills displayed as pills/badges

## ✏️ Customization

To customize with your information, update `app/page.tsx`:

- **Personal Info**: Update name, location, email, social links
- **Work Experience**: Modify the `workExperience` array
- **Skills**: Update the `skills` array
- **About**: Change the about section text

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📞 Contact

- **Email**: ibshittu01@gmail.com
- **GitHub**: [@ibrahimshittu](https://github.com/ibrahimshittu)
- **LinkedIn**: [Ibrahim Shittu](https://linkedin.com/in/ibrahimshittu)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by [Self.so](https://self.so)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
