import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Child, UnifiedWaiverForm, WebsiteContent, GalleryImage, EmailSubscriber, FileMetadata, UserProfile } from '../backend';

// User profile hooks
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Waiver hooks
export function useSubmitWaiver() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      parentName: string;
      parentEmail: string;
      parentPhone: string;
      children: Child[];
      agreeUnifiedTerms: boolean;
      termsAndConditions: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitUnifiedWaiver(
        data.parentName,
        data.parentEmail,
        data.parentPhone,
        data.children,
        data.agreeUnifiedTerms,
        data.termsAndConditions
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allWaivers'] });
      queryClient.invalidateQueries({ queryKey: ['recentWaivers'] });
      queryClient.invalidateQueries({ queryKey: ['waiversWithVisitCounts'] });
    },
  });
}

// Get all waivers - uses listAllWaivers backend method (PUBLIC)
export function useListAllWaivers() {
  const { actor, isFetching } = useActor();

  return useQuery<UnifiedWaiverForm[]>({
    queryKey: ['allWaivers'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listAllWaivers();
      } catch (error) {
        console.error('Failed to fetch all waivers:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Get waivers with visit counts - ADMIN ONLY
export function useGetWaiversWithVisitCounts() {
  const { actor, isFetching } = useActor();

  return useQuery<UnifiedWaiverForm[]>({
    queryKey: ['waiversWithVisitCounts'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getWaiversWithVisitCounts();
      } catch (error) {
        console.error('Failed to fetch waivers with visit counts:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Get recent waivers - PUBLIC endpoint (no auth required)
export function useGetRecentWaivers() {
  const { actor, isFetching } = useActor();

  return useQuery<UnifiedWaiverForm[]>({
    queryKey: ['recentWaivers'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRecentWaivers();
      } catch (error) {
        console.error('Failed to fetch recent waivers:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
    retry: false,
  });
}

// Search waivers - PUBLIC endpoint (no auth required)
// Normalizes search term to lowercase for consistent matching
export function useSearchWaivers(searchTerm: string) {
  const { actor, isFetching } = useActor();
  
  // Normalize search term: trim and convert to lowercase
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return useQuery<UnifiedWaiverForm[]>({
    queryKey: ['searchWaivers', normalizedSearchTerm],
    queryFn: async () => {
      if (!actor || !normalizedSearchTerm) return [];
      try {
        const results = await actor.searchWaivers(normalizedSearchTerm);
        console.log(`Search results for "${normalizedSearchTerm}":`, results.length, 'waivers found');
        return results;
      } catch (error) {
        console.error('Failed to search waivers:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching && normalizedSearchTerm.length > 0,
    retry: false,
    staleTime: 0, // Always fetch fresh results
  });
}

// Search waivers for check-in - PUBLIC endpoint (no auth required)
// Uses the unified search backend method for consistent functionality
// Normalizes search term to lowercase for consistent matching
export function useSearchWaiversForCheckIn(searchTerm: string) {
  const { actor, isFetching } = useActor();
  
  // Normalize search term: trim and convert to lowercase
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return useQuery<UnifiedWaiverForm[]>({
    queryKey: ['searchWaiversForCheckIn', normalizedSearchTerm],
    queryFn: async () => {
      if (!actor || !normalizedSearchTerm) return [];
      try {
        // Use unifiedWaiverSearch for consistent search functionality
        const results = await actor.unifiedWaiverSearch(normalizedSearchTerm);
        console.log(`Check-in search results for "${normalizedSearchTerm}":`, results.length, 'waivers found');
        return results;
      } catch (error) {
        console.error('Failed to search waivers for check-in:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching && normalizedSearchTerm.length > 0,
    retry: false,
    staleTime: 0, // Always fetch fresh results
  });
}

// Check-in waiver - PUBLIC endpoint (no auth required)
export function useCheckInWaiver() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (waiverId: string) => {
      if (!actor) throw new Error('Actor not available');
      try {
        const visitCount = await actor.checkInWaiver(waiverId);
        return Number(visitCount);
      } catch (error) {
        console.error('Failed to check in waiver:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate all waiver-related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['allWaivers'] });
      queryClient.invalidateQueries({ queryKey: ['recentWaivers'] });
      queryClient.invalidateQueries({ queryKey: ['waiversWithVisitCounts'] });
      queryClient.invalidateQueries({ queryKey: ['searchWaivers'] });
      queryClient.invalidateQueries({ queryKey: ['searchWaiversForCheckIn'] });
    },
  });
}

// Website content hooks
export function useGetWebsiteContent() {
  const { actor, isFetching } = useActor();

  return useQuery<WebsiteContent | null>({
    queryKey: ['websiteContent'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWebsiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateWebsiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: WebsiteContent) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.updateWebsiteContent(content);
      } catch (error) {
        console.error('Failed to update website content:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websiteContent'] });
    },
  });
}

// Gallery hooks - uses getGalleryImages which includes both static and uploaded images
export function useGetGalleryImages() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ url, description }: { url: string; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.addGalleryImage(url, description);
      } catch (error) {
        console.error('Failed to add gallery image:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate gallery images to refresh the list
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useRemoveGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.removeGalleryImage(id);
      } catch (error) {
        console.error('Failed to remove gallery image:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate gallery images to refresh the list
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

// Email subscriber hooks
export function useSubscribeEmail() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.subscribeEmail(email);
    },
  });
}

export function useGetEmailSubscribers() {
  const { actor, isFetching } = useActor();

  return useQuery<EmailSubscriber[]>({
    queryKey: ['emailSubscribers'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getEmailSubscribers();
      } catch (error) {
        console.error('Failed to fetch email subscribers:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useExportEmailSubscribersCSV() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.exportEmailSubscribersCSV();
      } catch (error) {
        console.error('Failed to export email subscribers:', error);
        throw error;
      }
    },
  });
}

// File storage hooks - admin only operations
export function useFileList() {
  const { actor, isFetching } = useActor();

  return useQuery<FileMetadata[]>({
    queryKey: ['fileList'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.fileList();
    },
    enabled: !!actor && !isFetching,
  });
}

// Helper function to get canister ID from environment or hostname
function getCanisterId(): string {
  // Try to get from hostname first (production)
  const hostname = window.location.hostname;
  if (hostname.includes('.icp0.io') || hostname.includes('.ic0.app')) {
    const parts = hostname.split('.');
    if (parts.length > 0 && parts[0]) {
      return parts[0];
    }
  }
  
  // Fallback to environment variable
  if (import.meta.env.VITE_BACKEND_CANISTER_ID) {
    return import.meta.env.VITE_BACKEND_CANISTER_ID;
  }
  
  console.error('Cannot determine canister ID');
  return '';
}

// Generate file URL for accessing uploaded files via canister HTTP interface
function generateFileUrl(path: string): string {
  const canisterId = getCanisterId();
  const isDevelopment = import.meta.env.DEV || window.location.hostname.includes('localhost');
  
  // Remove leading slashes from path
  const cleanPath = path.replace(/^\/+/, '');
  
  if (isDevelopment) {
    return `http://${canisterId}.localhost:4943/${cleanPath}`;
  } else {
    return `https://${canisterId}.icp0.io/${cleanPath}`;
  }
}

export function useFileUpload() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      path, 
      file, 
      onProgress 
    }: { 
      path: string; 
      file: File; 
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const totalChunks = Math.ceil(uint8Array.length / CHUNK_SIZE);

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, uint8Array.length);
        const chunk = uint8Array.slice(start, end);
        const isComplete = i === totalChunks - 1;

        try {
          await actor.fileUpload(path, file.type, chunk, isComplete);
          
          // Report progress
          if (onProgress) {
            const percentage = Math.round(((i + 1) / totalChunks) * 100);
            onProgress(percentage);
          }
        } catch (error) {
          console.error(`Failed to upload chunk ${i + 1}/${totalChunks}:`, error);
          throw error;
        }
      }

      // Return the URL for the uploaded file
      return generateFileUrl(path);
    },
    onSuccess: () => {
      // Invalidate both file list and gallery images
      queryClient.invalidateQueries({ queryKey: ['fileList'] });
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useFileDelete() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.fileDelete(path);
      } catch (error) {
        console.error('Failed to delete file:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate both file list and gallery images
      queryClient.invalidateQueries({ queryKey: ['fileList'] });
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}
