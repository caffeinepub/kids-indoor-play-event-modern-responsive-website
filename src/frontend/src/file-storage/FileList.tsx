import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { FileMetadata } from "../backend";

export function sanitizeUrl(url: string): string {
  // Remove leading slashes and ensure clean path
  return url.replace(/^\/+/, "");
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  const invalidateFileList = async () => {
    await queryClient.invalidateQueries({ queryKey: ["fileList"] });
  };

  return { invalidateFileList };
}

export function useFileList() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<FileMetadata[]>({
    queryKey: ["fileList"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.fileList();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Helper function to get canister ID synchronously from environment or hostname
function getCanisterIdSync(): string {
  // Try to get from window location
  const hostname = window.location.hostname;
  if (hostname.includes(".icp0.io") || hostname.includes(".ic0.app")) {
    // Extract canister ID from subdomain
    const parts = hostname.split(".");
    if (parts.length > 0 && parts[0]) {
      return parts[0];
    }
  }

  // Fallback to environment variable
  if (import.meta.env.VITE_BACKEND_CANISTER_ID) {
    return import.meta.env.VITE_BACKEND_CANISTER_ID;
  }

  // Last resort: empty string (will cause issues but prevents crash)
  console.error("Cannot determine canister ID");
  return "";
}

export async function getFileUrl(path: string): Promise<string> {
  const sanitized = sanitizeUrl(path);
  const canisterId = getCanisterIdSync();

  // Check if we're in development or production
  const isDevelopment =
    import.meta.env.DEV || window.location.hostname.includes("localhost");

  if (isDevelopment) {
    // Local development URL
    return `http://${canisterId}.localhost:4943/${sanitized}`;
  }
  // Production URL on IC
  return `https://${canisterId}.icp0.io/${sanitized}`;
}

// Synchronous version that uses the current backend canister ID
export function getFileUrlSync(path: string): string {
  const sanitized = sanitizeUrl(path);
  const canisterId = getCanisterIdSync();

  // Check if we're in development or production
  const isDevelopment =
    import.meta.env.DEV || window.location.hostname.includes("localhost");

  if (isDevelopment) {
    // Local development URL
    return `http://${canisterId}.localhost:4943/${sanitized}`;
  }
  // Production URL on IC
  return `https://${canisterId}.icp0.io/${sanitized}`;
}
