import React, { useState } from "react";
import styles from "./ProfileModal.module.css";
import { FaUser, FaCog, FaSignOutAlt, FaEdit, FaCamera } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const ProfileModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate teller creating amazing AI-powered narratives.",
    avatar: null
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        avatar: URL.createObjectURL(file)
      });
    }
  };

  const handleSave = () => {
    // Handle profile save logic here
    console.log("Profile saved:", profileData);
    onClose();
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{t.profileModal.title}</h2>
          <p className={styles.modalSubtitle}>{t.profileModal.subtitle}</p>
        </div>

        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser />
            <span>{t.profileModal.profile}</span>
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog />
            <span>{t.profileModal.settings}</span>
          </button>
        </div>

        {activeTab === "profile" && (
          <div className={styles.tabContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <label className={styles.avatarUpload}>
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>{t.profileModal.fullName}</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t.profileModal.enterFullName}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>{t.profileModal.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t.profileModal.enterEmail}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio" className={styles.label}>{t.profileModal.bio}</label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder={t.profileModal.tellUsAboutYourself}
                rows="3"
              />
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.saveButton} onClick={handleSave}>
                {t.profileModal.saveChanges}
              </button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.tabContent}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>{t.profileModal.emailNotifications}</h4>
                <p>{t.profileModal.emailNotificationsDesc}</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>{t.profileModal.storyReminders}</h4>
                <p>{t.profileModal.storyRemindersDesc}</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>{t.profileModal.darkMode}</h4>
                <p>{t.profileModal.darkModeDesc}</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <FaSignOutAlt />
                {t.profileModal.logout}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
