import { Button } from "./ui/button";
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 shadow-sm flex justify-between items-center px-5 mb-4">
        <div className="flex items-center space-x-3">
          <a href="/" className="flex gap-3">
            <img
              src="/ai-trip-planner.png"
              alt="logo"
              className="h-10 w-10 rounded-xl"
            />
            <span className="font-bold text-2xl hidden md:block">AI Trip Planner</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">Create Trip</Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              </div>
          {user ? (
              <Button variant="outline" className="rounded-full" onClick={() => setOpenDialog(true)}>Logout</Button>
          ) : (
            <div className="flex items-center space-x-4">
              <a href="/sign-in">
                <Button variant="outline" className="rounded-full">Sign In</Button>
              </a>
              <a href="/sign-up">
                <Button variant="outline" className="rounded-full">Sign Up</Button>
              </a>
            </div>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Confirm Logout</DialogTitle>
            <DialogDescription>
              <p>Are you sure you want to log out?</p>
              <div className="flex justify-end mt-4 space-x-2">
                <Button onClick={handleLogout} disabled={loading}>
                  {loading ? <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" /> : 'Logout'}
                </Button>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;