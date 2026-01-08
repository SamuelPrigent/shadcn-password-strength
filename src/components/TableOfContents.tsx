'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface TocItem {
  id: string;
  label: string;
}

const tocItems: TocItem[] = [
  { id: 'setup', label: 'Setup' },
  { id: 'examples', label: 'Examples' },
  { id: 'props', label: 'Props' },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    tocItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden xl:block fixed left-[max(1.5rem,calc(50%-45rem))] top-10 w-[200px]">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">On this page</h4>
      <ul className="space-y-2 text-sm border-l border-gray-200 dark:border-gray-800">
        {tocItems.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={clsx(
                'block pl-4 py-1 -ml-px border-l-2 transition-colors',
                activeId === item.id
                  ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-medium'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
