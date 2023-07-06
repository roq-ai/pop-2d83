const mapping: Record<string, string> = {
  invitations: 'invitation',
  projects: 'project',
  startups: 'startup',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
