import React, { useState } from 'react';
import { Search, Home, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useSearchWaiversForCheckIn, useCheckInWaiver } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import type { UnifiedWaiverForm } from '../backend';
import { toast } from 'sonner';

export default function EmployeeCheckIn() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Search waivers for check-in - PUBLIC endpoint
  const { data: searchResults = [], isLoading: searchLoading } = useSearchWaiversForCheckIn(searchTerm);
  
  // Check-in mutation
  const checkInMutation = useCheckInWaiver();

  const isSearching = searchTerm.trim().length > 0;

  const handleCheckIn = async (waiver: UnifiedWaiverForm) => {
    try {
      const newVisitCount = await checkInMutation.mutateAsync(waiver.id);
      toast.success(`Check-in successful! Total visits: ${newVisitCount}`, {
        description: `${waiver.parentName} has been checked in.`,
      });
    } catch (error) {
      console.error('Check-in failed:', error);
      toast.error('Check-in failed', {
        description: 'Please try again or contact support.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Home Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Employee Check-In
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Search for customers and check them in
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: '/' })}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="w-5 h-5" />
              Search for Customer
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter a child's name or parent's name to find their waiver
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

        {/* Search Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {isSearching ? 'Search Results' : 'Ready to Check In'}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isSearching
                ? 'Click "Check In" to record a visit'
                : 'Search for a customer to begin check-in'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSearching && searchLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4" />
                <p className="text-gray-600">Searching...</p>
              </div>
            ) : isSearching && searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((waiver) => (
                  <CheckInCard
                    key={waiver.id}
                    waiver={waiver}
                    onCheckIn={() => handleCheckIn(waiver)}
                    isCheckingIn={checkInMutation.isPending}
                  />
                ))}
              </div>
            ) : isSearching ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg">
                  No customers found matching your search
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try searching by a different name
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👋</div>
                <p className="text-gray-600 text-lg">
                  Enter a customer name to begin
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Search by parent or child name
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface CheckInCardProps {
  waiver: UnifiedWaiverForm;
  onCheckIn: () => void;
  isCheckingIn: boolean;
}

function CheckInCard({ waiver, onCheckIn, isCheckingIn }: CheckInCardProps) {
  const childrenNames = waiver.children.map(c => c.name).join(', ');
  const visitCount = Number(waiver.visitCount);
  
  return (
    <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900">
              {waiver.parentName}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full w-fit">
                {waiver.children.length} {waiver.children.length === 1 ? 'child' : 'children'}
              </span>
              {visitCount > 0 && (
                <span className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-full w-fit font-medium">
                  {visitCount} {visitCount === 1 ? 'visit' : 'visits'}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p className="truncate">{waiver.parentEmail} • {waiver.parentPhone}</p>
            <div className="bg-gray-50 p-2 rounded border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Children:</p>
              <div className="space-y-1">
                {waiver.children.map((child, idx) => (
                  <p key={idx} className="text-sm font-medium text-gray-900">
                    {child.name}
                    {child.birthday && <span className="text-gray-500 text-xs ml-2">({child.birthday})</span>}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button
            onClick={onCheckIn}
            disabled={isCheckingIn}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isCheckingIn ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Checking In...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Check In
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
