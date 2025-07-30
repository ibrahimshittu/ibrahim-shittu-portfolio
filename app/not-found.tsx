import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-sm text-foreground hover:underline"
          >
            Resume
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold tracking-tighter">404</h1>
          <p className="mt-4 text-2xl font-medium text-muted-foreground">
            Page Not Found
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Oops! It seems you've ventured into uncharted territory. The page
            you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
          >
            Go back home
          </Link>
        </div>
      </main>
      <footer className="text-center mt-auto mb-4">
        <a
          className="text-muted-foreground font-mono text-sm"
          href="/?ref=ibrahim-shittu"
        >
          Made with ❤️ by{" "}
          <span className="text-foreground underline underline-offset-2">
            Ibrahim Shittu
          </span>
        </a>
      </footer>
    </div>
  );
}
