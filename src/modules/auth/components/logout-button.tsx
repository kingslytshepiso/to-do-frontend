import Button from "@/modules/shared/components/button";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ConfirmDialog from "@/modules/shared/components/confirm-dialog";
import { useAuth } from "../hooks/auth-context";

export default function LogoutButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { logout } = useAuth();
  const handleLogout = async (canLogout: boolean) => {
    if (canLogout) {
      await logout();
    }
    hideDialog();
  };
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);
  return (
    <div>
      <Button onClick={showDialog}>
        <FontAwesomeIcon
          className="mr-0 sm:mr-2 md:mr-2"
          icon={faRightFromBracket}
        />
        <span className="hidden md:inline sm:inline">Logout</span>
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={handleLogout}
        title="Animated Dialog"
      >
        <p>This modal has smooth animations using Framer Motion.</p>
      </ConfirmDialog>
    </div>
  );
}
