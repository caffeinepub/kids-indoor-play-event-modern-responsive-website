import React, { useState } from 'react';
import { Search, Clock, ChevronDown, ChevronUp, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { useGetRecentWaivers, useSearchWaivers } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import type { UnifiedWaiverForm } from '../backend';

export default function WaiverCheck() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedWaiverId, setExpandedWaiverId] = useState<string | null>(null);

  const isAuthenticated = !!identity;

  // Fetch recent waivers (auto-refreshes every 5 seconds)
  const { data: recentWaivers = [], isLoading: recentLoading, error: recentError } = useGetRecentWaivers();
  
  // Search waivers
  const { data: searchResults = [], isLoading: searchLoading } = useSearchWaivers(searchTerm);

  const isSearching = searchTerm.trim().length > 0;
  const displayWaivers = isSearching ? searchResults : recentWaivers;

  const toggleExpanded = (waiverId: string) => {
    setExpandedWaiverId(expandedWaiverId === waiverId ? null : waiverId);
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🔐</div>
            <CardTitle className="text-2xl">Employee Login Required</CardTitle>
            <CardDescription>
              Sign in with Internet Identity to check waivers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="w-full"
              size="lg"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Waiver Check System
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Search for waivers by child or parent name
          </p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="w-5 h-5" />
              Search Waivers
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter a child's name or parent's name to search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by child or parent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                {searchLoading ? 'Searching...' : `Found ${searchResults.length} result(s)`}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Waivers Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg sm:text-xl">
                  {isSearching ? 'Search Results' : 'Recent Waivers'}
                </CardTitle>
              </div>
              {!isSearching && (
                <span className="text-xs sm:text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                  Auto-refreshes every 5 seconds
                </span>
              )}
            </div>
            <CardDescription className="text-sm sm:text-base">
              {isSearching
                ? 'Waivers matching your search criteria'
                : 'The 10 most recently submitted waivers'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load waivers. You may not have permission to view this data.
                </AlertDescription>
              </Alert>
            )}

            {(recentLoading || (isSearching && searchLoading)) ? (
              <div className="text-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading waivers...</p>
              </div>
            ) : displayWaivers.length > 0 ? (
              <div className="space-y-2">
                {displayWaivers.map((waiver) => (
                  <WaiverCard
                    key={waiver.id}
                    waiver={waiver}
                    isExpanded={expandedWaiverId === waiver.id}
                    onToggle={() => toggleExpanded(waiver.id)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-600 text-lg">
                  {isSearching ? 'No waivers found matching your search' : 'No recent waivers'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface WaiverCardProps {
  waiver: UnifiedWaiverForm;
  isExpanded: boolean;
  onToggle: () => void;
  formatDate: (timestamp: bigint) => string;
}

function WaiverCard({ waiver, isExpanded, onToggle, formatDate }: WaiverCardProps) {
  const childrenNames = waiver.children.map(c => c.name).join(', ');
  
  return (
    <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full p-3 text-left flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
              {waiver.parentName}
            </h3>
            <span className="text-xs text-gray-500 bg-blue-50 px-2 py-0.5 rounded-full w-fit">
              {waiver.children.length} {waiver.children.length === 1 ? 'child' : 'children'}
            </span>
          </div>
          <div className="text-xs text-gray-600 space-y-0.5">
            <p className="truncate">{waiver.parentEmail} • {waiver.parentPhone}</p>
            <p className="text-gray-700 font-medium">Children: {childrenNames}</p>
            <p className="text-gray-500">{formatDate(waiver.timestamp)}</p>
          </div>
        </div>
        <div className="flex-shrink-0 pt-1">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t p-3 bg-gray-50 space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Children Details</h4>
            <div className="space-y-1.5">
              {waiver.children.map((child, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded border border-gray-200"
                >
                  <p className="font-medium text-sm text-gray-900">{child.name}</p>
                  {child.birthday && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      Birthday: {child.birthday}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  waiver.agreeUnifiedTerms ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-gray-700">
                {waiver.agreeUnifiedTerms
                  ? 'Agreed to liability waiver and photo release'
                  : 'Did not agree to terms'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
