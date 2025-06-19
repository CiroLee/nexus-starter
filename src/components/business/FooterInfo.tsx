import { IconBrandGithubFilled } from '@tabler/icons-react';
export default function FooterInfo() {
  return (
    <footer className="mx-auto mt-4 flex items-center justify-center text-sm text-neutral-600">
      <span className="mr-1">Powered by</span>
      <a href="https://github.com/CiroLee/nexus-kit" className="group flex items-center gap-0.5" target="_blank" rel="noopener noreferrer">
        <IconBrandGithubFilled size={16} />
        <span className="group-hover:text-primary transition-colors">Nexus-Kit</span>
      </a>
    </footer>
  );
}
