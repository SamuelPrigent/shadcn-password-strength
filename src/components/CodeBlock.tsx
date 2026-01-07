'use client';

import React, { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';
import { Copy, RotateCcw } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  preview: React.ReactNode;
  onReset?: () => void;
}

export function CodeBlock({ code, preview, onReset }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    async function highlight() {
      const html = await codeToHtml(code, {
        lang: 'tsx',
        theme: 'github-dark',
      });
      setHighlightedCode(html);
    }
    highlight();
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border mb-14 border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-950">
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer',
              activeTab === 'preview'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path
                fillRule="evenodd"
                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer',
              activeTab === 'code'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
                clipRule="evenodd"
              />
            </svg>
            Code
          </button>
        </div>

        {/* Right side controls */}
        {activeTab === 'preview' && onReset && (
          <button
            onClick={onReset}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
            title="Reset example"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        {activeTab === 'code' && (
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <div className="p-6 pt-10 pb-14 bg-gray-50 dark:bg-gray-900/50 min-h-[200px] flex items-center justify-center">
          <div className="w-full max-w-md">{preview}</div>
        </div>
      ) : (
        <div
          className="shiki-wrapper overflow-auto max-h-[400px] text-sm [&_pre]:p-6 [&_pre]:m-0 [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
    </div>
  );
}
