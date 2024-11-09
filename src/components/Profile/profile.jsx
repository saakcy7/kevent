import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import Swal from "sweetalert2";

const Profile = ({ token, user }) => {
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    batch: "",
    department: "",
    year: "",
    avatarURL: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "New passwords do not match!",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          currentPassword: currentPassword,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password changed successfully.",
      });

      // Reset password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.message === "Current password is incorrect.") {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Current password is incorrect.",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to change password. Please try again.",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      const updatedUser = await response.json();
      setEditedUser(updatedUser);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully.",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update profile. Please try again.",
      });
    }
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }
  return (
    <div className="profile">
      <form onSubmit={handleProfileUpdate}>
        <div className="general-info-container">
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img src={user.avatarURL || "placeholder.jpg"} alt="Profile" />
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              <button className="change-photo-button">Upload New Photo</button>
            </div>
          </div>

          <div className="profile-info">
            <div className="h3-update">
              <h3>General Information</h3>
              <button type="submit" className="update">
                Update
              </button>
            </div>

            <label>Name</label>
            <div className="name-input">
              <input type="text" placeholder="First Name" name="firstName" value={editedUser.firstName} onChange={handleChange} required />
              <input type="text" placeholder="Last Name" name="lastName" value={editedUser.lastName} onChange={handleChange} required />
            </div>
            <div className="dept">
              <label>Department</label>
              <div className="dept-input">
                <select name="department" value={editedUser.department} onChange={handleChange} required>
                  <option value={user.department}>{user.department}</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="year-batch">
              <label>Batch</label>
              <div className="dept-input">
               <input type="text" placeholder="Batch" name="batch" value={editedUser.batch} onChange={handleChange} required />
                
              </div>

              <label>Year</label>
                <input type="text" placeholder="Year" name="year" value={editedUser.year} onChange={handleChange} required />
              
            </div>
          </div>
        </div>
      </form>
      <div className="change-password">
        <form onSubmit={handlePasswordChange}>
          <label className="change-pw-heading">Change Password?</label>

          <label>Current Password</label>
          <div className="password-field">
            <input type={isPasswordVisible ? "text" : "password"} placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="password-icon" />
          </div>

          <label>New Password</label>
          <div className="password-field">
            <input type={isPasswordVisible ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="password-icon" />
          </div>

          <label>Re-Enter Password</label>
          <div className="password-field">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className="password-icon" />
          </div>

          <div className="profile-info-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;