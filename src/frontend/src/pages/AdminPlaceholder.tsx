import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Clock,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Search,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  useAddGalleryImage,
  useExportEmailSubscribersCSV,
  useFileDelete,
  useFileList,
  useFileUpload,
  useGetCallerUserProfile,
  useGetEmailSubscribers,
  useGetGalleryImages,
  useGetRecentWaivers,
  useGetWaiversWithVisitCounts,
  useGetWebsiteContent,
  useInitializeAccessControl,
  useIsCallerAdmin,
  useRemoveGalleryImage,
  useResetAdminAccess,
  useSaveCallerUserProfile,
  useSearchWaivers,
  useUpdateWebsiteContent,
} from "../hooks/useQueries";

export default function AdminPlaceholder() {
  const { login, clear, loginStatus, identity, isLoginError } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("waivers");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const isAuthenticated = !!identity;

  // Mutations for admin access management
  const initializeAccessControlMutation = useInitializeAccessControl();
  const resetAdminAccessMutation = useResetAdminAccess();

  // Check if user is admin
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  // Get user profile
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();

  // Use custom hooks - now using getWaiversWithVisitCounts for admin view
  const {
    data: allWaivers = [],
    isLoading: waiversLoading,
    error: waiversError,
  } = useGetWaiversWithVisitCounts();
  const { data: recentWaivers = [], isLoading: recentWaiversLoading } =
    useGetRecentWaivers();
  const { data: searchResults = [], isLoading: searchLoading } =
    useSearchWaivers(searchTerm);
  const { data: websiteContent, isLoading: contentLoading } =
    useGetWebsiteContent();
  const { data: galleryImages = [], isLoading: galleryLoading } =
    useGetGalleryImages();
  const { data: fileList = [] } = useFileList();
  const { data: emailSubscribers = [] } = useGetEmailSubscribers();

  const updateContentMutation = useUpdateWebsiteContent();
  const fileUploadMutation = useFileUpload();
  const fileDeleteMutation = useFileDelete();
  const addGalleryImageMutation = useAddGalleryImage();
  const removeGalleryImageMutation = useRemoveGalleryImage();
  const exportEmailSubscribersMutation = useExportEmailSubscribersCSV();

  // Content form state
  const [contentForm, setContentForm] = useState({
    homepageText: "",
    aboutText: "",
    contactInfo: "",
    operatingHours: "9:30 AM - 8:00 PM daily",
  });

  // Update content form when data loads
  React.useEffect(() => {
    if (websiteContent) {
      setContentForm({
        homepageText: websiteContent.homepageText,
        aboutText: websiteContent.aboutText,
        contactInfo: websiteContent.contactInfo,
        operatingHours: websiteContent.operatingHours,
      });
    }
  }, [websiteContent]);

  // Check if profile setup is needed
  React.useEffect(() => {
    if (
      isAuthenticated &&
      !profileLoading &&
      profileFetched &&
      userProfile === null
    ) {
      setShowProfileSetup(true);
    }
  }, [isAuthenticated, profileLoading, profileFetched, userProfile]);

  // Handle profile setup
  const handleProfileSetup = async () => {
    if (!profileName.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      await saveProfileMutation.mutateAsync({ name: profileName.trim() });
      setShowProfileSetup(false);
      setProfileName("");
    } catch (error) {
      alert(`Failed to save profile: ${error}`);
    }
  };

  // Determine which waivers to display with sorting
  const displayWaivers = useMemo(() => {
    const waivers = searchTerm.trim() ? searchResults : allWaivers;
    // Sort by timestamp descending (most recent first)
    return [...waivers].sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      if (a.timestamp < b.timestamp) return 1;
      return 0;
    });
  }, [searchTerm, searchResults, allWaivers]);

  const isSearching = searchTerm.trim().length > 0;

  // Export waivers to CSV with visit counts
  const exportWaivers = () => {
    if (!allWaivers.length) {
      alert("No waivers to export");
      return;
    }

    const headers = [
      "ID",
      "Parent Name",
      "Parent Email",
      "Parent Phone",
      "Children Names",
      "Children Birthdays",
      "Agreed to Terms",
      "Visit Count",
      "Timestamp",
    ];
    const rows = allWaivers.map((waiver) => [
      waiver.id,
      waiver.parentName,
      waiver.parentEmail,
      waiver.parentPhone,
      waiver.children.map((c) => c.name).join("; "),
      waiver.children.map((c) => c.birthday || "N/A").join("; "),
      waiver.agreeUnifiedTerms ? "Yes" : "No",
      String(waiver.visitCount),
      new Date(Number(waiver.timestamp) / 1000000).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waivers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export email subscribers to CSV
  const exportEmailSubscribers = async () => {
    try {
      const csv = await exportEmailSubscribersMutation.mutateAsync();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `email-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Failed to export email subscribers: ${error}`);
    }
  };

  // Handle file upload with progress tracking
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `gallery/${timestamp}-${sanitizedName}`;

      // Upload file to backend storage with progress tracking
      // The mutation returns the URL for the uploaded file
      const fileUrl = await fileUploadMutation.mutateAsync({
        path,
        file,
        onProgress: (percentage) => {
          setUploadProgress(percentage);
        },
      });

      // Add to gallery images with the returned URL
      await addGalleryImageMutation.mutateAsync({
        url: fileUrl,
        description: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
      });

      setIsUploading(false);
      setUploadProgress(0);
      alert(
        "Image uploaded successfully! It should now appear in the gallery.",
      );

      // Reset file input
      event.target.value = "";
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (
        errorMessage.includes("Unauthorized") ||
        errorMessage.includes("admin")
      ) {
        alert(
          "You do not have permission to upload images. Admin access required.",
        );
      } else {
        alert(`Failed to upload image: ${errorMessage}`);
      }
    }
  };

  // Handle image delete
  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Delete from gallery metadata first
      await removeGalleryImageMutation.mutateAsync(imageId);

      // Extract path from URL and delete file if it's a stored file (not a predefined asset)
      if (imageUrl.includes("gallery/")) {
        const urlParts = imageUrl.split("/");
        const galleryIndex = urlParts.findIndex((part) => part === "gallery");
        if (galleryIndex !== -1 && galleryIndex < urlParts.length - 1) {
          const fileName = urlParts[galleryIndex + 1];
          const path = `gallery/${fileName}`;

          // Check if file exists in storage before attempting to delete
          const fileExists = fileList.some((f) => f.path === path);
          if (fileExists) {
            await fileDeleteMutation.mutateAsync(path);
          }
        }
      }

      alert("Image deleted successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (
        errorMessage.includes("Unauthorized") ||
        errorMessage.includes("admin")
      ) {
        alert(
          "You do not have permission to delete images. Admin access required.",
        );
      } else {
        alert(`Failed to delete image: ${errorMessage}`);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Handle login: authenticate then call initializeAccessControl so a new II
  // can claim the admin slot if it was reset (safe no-op if admin already set)
  const handleLogin = async () => {
    await login();
    try {
      await initializeAccessControlMutation.mutateAsync();
    } catch {
      // Ignore — isCallerAdmin query will reflect actual state
    }
  };

  // Handle admin reset: clear admin assignment, show message to guide re-login
  const handleResetAdmin = async () => {
    if (
      !confirm(
        "Are you sure you want to reset admin access? You will need to log out and log back in with your new Internet Identity to reclaim admin access.",
      )
    )
      return;
    try {
      await resetAdminAccessMutation.mutateAsync();
      setResetMessage(
        "Admin access has been reset. Please log out and log back in with your new Internet Identity to claim admin access.",
      );
    } catch (error) {
      alert(`Failed to reset admin access: ${error}`);
    }
  };

  // Handle content update
  const handleContentUpdate = async () => {
    try {
      await updateContentMutation.mutateAsync(contentForm);
      alert("Content updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (
        errorMessage.includes("Unauthorized") ||
        errorMessage.includes("admin")
      ) {
        alert(
          "You do not have permission to update content. Admin access required.",
        );
      } else {
        alert(`Failed to update content: ${errorMessage}`);
      }
    }
  };

  // Not logged in
  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎈</div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in with Internet Identity to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={
                loginStatus === "logging-in" ||
                initializeAccessControlMutation.isPending
              }
              className="w-full"
              size="lg"
            >
              {loginStatus === "logging-in" ||
              initializeAccessControlMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initializeAccessControlMutation.isPending
                    ? "Setting up access..."
                    : "Logging in..."}
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>
            {isLoginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to login. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile setup dialog
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">
              <User className="h-16 w-16 mx-auto text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>
              Please tell us your name to complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileName">Your Name</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
                autoFocus
              />
            </div>
            <Button
              onClick={handleProfileSetup}
              disabled={saveProfileMutation.isPending || !profileName.trim()}
              className="w-full"
              size="lg"
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Checking admin status
  if (isCheckingAdmin || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not an admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You do not have admin permissions to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome, {userProfile?.name || "Admin"}! Manage your website
              content and waivers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleResetAdmin}
              variant="outline"
              size="sm"
              disabled={resetAdminAccessMutation.isPending}
              data-ocid="reset-admin-btn"
            >
              {resetAdminAccessMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Admin Access"
              )}
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Reset message banner */}
        {resetMessage && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {resetMessage}
            </AlertDescription>
          </Alert>
        )}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="waivers">
              <FileText className="mr-2 h-4 w-4" />
              Waivers
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <ImageIcon className="mr-2 h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <FileText className="mr-2 h-4 w-4" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* Waivers Tab */}
          <TabsContent value="waivers" className="space-y-6">
            {/* Recent Waivers Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <CardTitle>Recent Waivers</CardTitle>
                </div>
                <CardDescription>
                  The 10 most recently submitted waivers (auto-refreshes every 5
                  seconds)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentWaiversLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                  </div>
                ) : recentWaivers.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Parent Name
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Contact
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Children
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Visits
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {recentWaivers.map((waiver) => (
                            <tr key={waiver.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium">
                                {waiver.parentName}
                              </td>
                              <td className="px-3 py-2 text-xs">
                                <div>{waiver.parentEmail}</div>
                                <div className="text-gray-500">
                                  {waiver.parentPhone}
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="text-xs space-y-0.5">
                                  {waiver.children.map((child) => (
                                    <div key={child.name}>{child.name}</div>
                                  ))}
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {Number(waiver.visitCount)}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-xs whitespace-nowrap">
                                {new Date(
                                  Number(waiver.timestamp) / 1000000,
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent waivers
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Waivers Section with Search */}
            <Card>
              <CardHeader>
                <CardTitle>All Waivers - Complete History</CardTitle>
                <CardDescription>
                  View all waivers with visit counts. Search by child or parent
                  name, or export all data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Export Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex-1 w-full sm:max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search by child or parent name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {searchTerm && (
                      <p className="text-xs text-gray-500 mt-1">
                        {searchLoading
                          ? "Searching..."
                          : `Found ${searchResults.length} result(s)`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Waivers</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {allWaivers.length}
                      </p>
                    </div>
                    <Button
                      onClick={exportWaivers}
                      disabled={!allWaivers.length}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                {waiversError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to load waivers. You may not have permission to
                      view this data.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Waivers Table */}
                {waiversLoading || (isSearching && searchLoading) ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    <p className="text-sm text-gray-600 mt-2">
                      Loading waivers...
                    </p>
                  </div>
                ) : displayWaivers.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-[600px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Parent Name
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Contact
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Children
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Visits
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {displayWaivers.map((waiver) => (
                            <tr key={waiver.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2">{waiver.parentName}</td>
                              <td className="px-3 py-2 text-xs">
                                <div>{waiver.parentEmail}</div>
                                <div className="text-gray-500">
                                  {waiver.parentPhone}
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="text-xs space-y-0.5">
                                  {waiver.children.map((child) => (
                                    <div key={child.name}>
                                      {child.name}
                                      {child.birthday && (
                                        <span className="text-gray-500">
                                          {" "}
                                          ({child.birthday})
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {Number(waiver.visitCount)}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-xs whitespace-nowrap">
                                {new Date(
                                  Number(waiver.timestamp) / 1000000,
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 text-xs text-gray-600 border-t">
                      Showing {displayWaivers.length} of {allWaivers.length}{" "}
                      total waivers
                      {isSearching && " (filtered)"}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {isSearching
                      ? "No waivers found matching your search"
                      : "No waivers submitted yet"}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
                <CardDescription>
                  Edit website text content for different sections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contentLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="homepageText">Homepage Text</Label>
                      <Textarea
                        id="homepageText"
                        value={contentForm.homepageText}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            homepageText: e.target.value,
                          })
                        }
                        placeholder="Enter homepage text..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aboutText">About Section Text</Label>
                      <Textarea
                        id="aboutText"
                        value={contentForm.aboutText}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            aboutText: e.target.value,
                          })
                        }
                        placeholder="Enter about section text..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Textarea
                        id="contactInfo"
                        value={contentForm.contactInfo}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            contactInfo: e.target.value,
                          })
                        }
                        placeholder="Enter contact information..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <Input
                        id="operatingHours"
                        value={contentForm.operatingHours}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            operatingHours: e.target.value,
                          })
                        }
                        placeholder="e.g., 9:30 AM - 8:00 PM daily"
                      />
                    </div>

                    <Button
                      onClick={handleContentUpdate}
                      disabled={updateContentMutation.isPending}
                      className="w-full"
                    >
                      {updateContentMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Content
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>
                  Upload and manage gallery images (max 5MB per image,
                  JPG/PNG/GIF/WEBP formats)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Image Form */}
                <div className="border-2 border-dashed rounded-lg p-6 space-y-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      Upload New Image
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Select an image file to add to your gallery
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="cursor-pointer"
                    />
                    {isUploading && (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-sm text-center text-blue-600">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery Images List */}
                {galleryLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    <p className="text-sm text-gray-600 mt-2">
                      Loading gallery images...
                    </p>
                  </div>
                ) : galleryImages.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        Gallery Images ({galleryImages.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {galleryImages.map((image) => (
                        <div
                          key={image.id}
                          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-[4/3] bg-gray-100">
                            <img
                              src={image.url}
                              alt={image.description}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                                target.onerror = null;
                              }}
                            />
                          </div>
                          <div className="p-3 space-y-2">
                            <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                              {image.description}
                            </p>
                            <Button
                              onClick={() =>
                                handleDeleteImage(image.id, image.url)
                              }
                              disabled={
                                removeGalleryImageMutation.isPending ||
                                fileDeleteMutation.isPending
                              }
                              variant="destructive"
                              size="sm"
                              className="w-full"
                            >
                              {removeGalleryImageMutation.isPending ||
                              fileDeleteMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      No gallery images yet
                    </p>
                    <p className="text-sm">
                      Upload your first image using the form above
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Subscribers</CardTitle>
                <CardDescription>
                  View and export email subscriber list
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Subscribers</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {emailSubscribers.length}
                    </p>
                  </div>
                  <Button
                    onClick={exportEmailSubscribers}
                    disabled={
                      !emailSubscribers.length ||
                      exportEmailSubscribersMutation.isPending
                    }
                  >
                    {exportEmailSubscribersMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </>
                    )}
                  </Button>
                </div>

                {emailSubscribers.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">
                              Date Subscribed
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {emailSubscribers.map((subscriber) => (
                            <tr
                              key={subscriber.email}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3">{subscriber.email}</td>
                              <td className="px-4 py-3">
                                {new Date(
                                  Number(subscriber.timestamp) / 1000000,
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No email subscribers yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
