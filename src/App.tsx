import { useEffect, useState } from 'react'
import { VeltProvider, useVeltClient } from '@veltdev/react'
import { AppProvider } from '@/contexts/AppContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { Toaster } from '@/components/ui/sonner'
import { VeltUser } from '@/types/veltUser'

// Static users configuration
const staticUsers: VeltUser[] = [
  {
    userId: "user-1",
    name: "Rick Sanchez",
    email: "rick@example.com",
    photoUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    organizationId: "org-1",
  },
  {
    userId: "user-2",
    name: "Morty Smith",
    email: "morty@example.com",
    photoUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    organizationId: "org-1",
  },
];

interface AppContentProps {
  currentUser: VeltUser;
  staticUsers: VeltUser[];
  onSwitchUser: (user: VeltUser) => void;
}

function AppContent({
  currentUser,
  staticUsers,
  onSwitchUser,
}: AppContentProps) {
  const { client } = useVeltClient();

  useEffect(() => {
    const initializeVelt = async () => {
      if (client && currentUser) {
        console.log("🔧 Initializing Velt with user:", currentUser);

        try {
          // Identify the user first
          await client.identify(currentUser);
          console.log("✅ User identified successfully");

          // Then set the document for collaboration
          await client.setDocument("collaborative-clickup-clone-2024", {
            documentName: "ClickUp Clone Collaboration",
          });
          console.log("✅ Document set successfully");
        } catch (error) {
          console.error("❌ Velt initialization error:", error);
        }
      }
    };

    initializeVelt();
  }, [client, currentUser]);

  return (
    <AppProvider currentUser={currentUser} staticUsers={staticUsers} onSwitchUser={onSwitchUser}>
      <AppLayout />
      <Toaster />
    </AppProvider>
  )
}

function App() {
  const apiKey = import.meta.env.VITE_VELT_API_KEY;
  const [currentUser, setCurrentUser] = useState(staticUsers[0]);

  const switchUser = (user: VeltUser) => {
    setCurrentUser(user);
    localStorage.setItem("clickup-current-user", user.userId);
  };

  // Load user preference on app start
  useEffect(() => {
    const storedUserId = localStorage.getItem("clickup-current-user");
    const user = storedUserId
      ? staticUsers.find((u) => u.userId === storedUserId) || staticUsers[0]
      : staticUsers[0];
    setCurrentUser(user);
  }, []);

  return (
    <VeltProvider apiKey={apiKey}>
      <AppContent
        currentUser={currentUser}
        staticUsers={staticUsers}
        onSwitchUser={switchUser}
      />
    </VeltProvider>
  )
}

export default App
