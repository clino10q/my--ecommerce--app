import { useState } from "react";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconPackage,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";
import { Link, Navigate } from "react-router-dom";

export default function Profile({ user, currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Jane Doe",
    email: currentUser?.email || "jane@example.com",
    phone: currentUser?.phone || "+234 800 000 0000",
    address: currentUser?.address || "123 Market Street, Lagos",
  });

  if (!currentUser) return <Navigate to="/login" replace />;

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    // hook this up to your update logic / API call later
    const updatedUser = { ...currentUser, ...formData };

    // update the "logged in" record
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    // also update it in the "users" list so it persists across future logins
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...u, ...formData } : u,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 px-6 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-2">
          <Link
            to="/shop"
            className="pr-3 dark:text-white hover:text-emerald-500 hover:underline transition-colors"
          >
            <IconArrowNarrowLeft stroke={1} className="inline -mr-0.5" />
            Go back
          </Link>
          <h1 className="inline text-3xl font-bold text-black dark:text-white mb-8">
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: avatar + summary */}
          <div className="md:col-span-1">
            <div
              className="flex flex-col items-center p-6 rounded-md shadow-lg
                             bg-white dark:bg-gray-800
                             dark:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] dark:shadow-emerald-500"
            >
              <div
                className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900
                               flex items-center justify-center mb-4"
              >
                <IconUser
                  size={40}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>
              <h2 className="font-bold text-lg text-black dark:text-white">
                {currentUser.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser.email}
              </p>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2
                           rounded-md bg-emerald-800 text-white font-bold
                           hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <IconEdit size={16} />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Right: details + orders */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Personal info card */}
            <div
              className="p-6 rounded-md shadow-lg bg-white dark:bg-gray-800
                             dark:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] dark:shadow-emerald-500"
            >
              <h3 className="font-bold text-black dark:text-white mb-4">
                Personal Information
              </h3>

              <div className="flex flex-col gap-4">
                <ProfileField
                  icon={<IconUser size={18} />}
                  label="Full Name"
                  value={formData.name}
                  isEditing={isEditing}
                  onChange={(v) => handleChange("name", v)}
                />
                <ProfileField
                  icon={<IconMail size={18} />}
                  label="Email"
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={(v) => handleChange("email", v)}
                />
                <ProfileField
                  icon={<IconPhone size={18} />}
                  label="Phone"
                  value={formData.phone}
                  isEditing={isEditing}
                  onChange={(v) => handleChange("phone", v)}
                />
                <ProfileField
                  icon={<IconMapPin size={18} />}
                  label="Address"
                  value={formData.address}
                  isEditing={isEditing}
                  onChange={(v) => handleChange("address", v)}
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="mt-6 px-6 py-2 rounded-md bg-emerald-600 text-white font-bold
                             hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              )}
            </div>

            {/* Order history card */}
            <div
              className="p-6 rounded-md shadow-lg bg-white dark:bg-gray-800
                             dark:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] dark:shadow-emerald-500"
            >
              <h3 className="font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <IconPackage size={18} />
                Order History
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You haven't placed any orders yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value, isEditing, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-emerald-600 dark:text-emerald-400">{icon}</span>
      <div className="flex-1">
        <label className="text-xs text-gray-500 dark:text-gray-400">
          {label}
        </label>
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-md border border-gray-200 dark:border-neutral-700
                       bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        ) : (
          <p className="text-sm text-black dark:text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
