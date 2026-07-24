import {
  ApiError,
  ApiErrorBody,
  GithubProfile,
  GithubRepository,
} from '@/types/github-profile.types';

/**
 * Service Layer: the single place that talks to the NestJS backend.
 * Components never call fetch directly.
 */
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/$/, '');

async function request<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(
      'No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.',
      0,
    );
  }

  if (!response.ok) {
    let message = 'Ocurrió un error al obtener los datos.';
    try {
      const body = (await response.json()) as ApiErrorBody;
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Ignore non-JSON error bodies and keep the generic message.
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

export const githubProfileService = {
  getProfile(username: string): Promise<GithubProfile> {
    return request<GithubProfile>(`/user/${encodeURIComponent(username)}`);
  },
  getRepositories(username: string): Promise<GithubRepository[]> {
    return request<GithubRepository[]>(
      `/user/${encodeURIComponent(username)}/repositories`,
    );
  },
};
