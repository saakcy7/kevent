import React, { useState, useEffect, useRef } from "react";
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
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef(null);

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
        body: JSON.stringify({ email: user.email, currentPassword: currentPassword, password: newPassword }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert("Current password is incorrect.");
        } else {
          throw new Error("Error changing password");
        }
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password changed successfully.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to change password. Please try again.",
      });
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
        throw new Error("Error updating profile");
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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setIsImageSelected(true);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      const response = await fetch("http://localhost:3000/users/upload-profileImage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile photo updated successfully.",
        });

        user.avatarURL = result.avatarURL;
        setIsImageSelected(false); // Reset image selection after upload
      } else {
        throw new Error("Upload failed.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to upload the image. Please try again.",
      });
    }
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
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
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
              {!isImageSelected ? (
                <button type="button" className="change-photo-button" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                  Choose New Photo
                </button>
              ) : (
                <button onClick={handleImageUpload} className="upload-button">
                  Upload
                </button>
              )}
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
              <div className="batch-input">
                <select name="batch" value={editedUser.batch} onChange={handleChange} required>
                  <option value="">Select a year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <label>Year</label>
              <select name="year" value={editedUser.year} onChange={handleChange} required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
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
