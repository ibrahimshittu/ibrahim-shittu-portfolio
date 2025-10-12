import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold tracking-tighter">404</h1>
          <p className="mt-4 text-2xl font-medium text-muted-foreground">
            Page Not Found
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Oops! It seems you&apos;ve ventured into uncharted territory. The
            page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
          >
            Go back home
          </Link>
        </div>
      </main>
    </div>
  );
}
