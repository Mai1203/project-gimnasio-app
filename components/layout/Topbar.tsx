'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

/**
 * Top navigation bar for the admin dashboard
 * Contains search, notifications, and user profile
 */
export function Topbar() {
  return (
    <header className="border-b border-border bg-surface px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="max-w-md flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-text-muted" />
            <Input placeholder="Buscar usuarios, planes..." className="pl-10" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
