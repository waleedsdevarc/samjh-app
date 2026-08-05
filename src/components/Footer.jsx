export default function Footer() {
  return (
    <footer className="text-center text-xs text-gray-500 py-6 px-4 border-t border-green-100 mt-4">
      <p>
        <a href="/privacy.html" className="underline hover:text-green-700">Privacy Policy</a>
        {' · '}
        <a href="https://github.com/waleedsdevarc/samjh-app" className="underline hover:text-green-700" target="_blank" rel="noopener noreferrer">
          Source on GitHub
        </a>
      </p>
    </footer>
  );
}
