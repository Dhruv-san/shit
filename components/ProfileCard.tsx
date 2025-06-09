import React from 'react';

interface ProfileCardProps {
  name: string;
  bio: string;
  skills: string[];
  photoURL?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, bio, skills, photoURL }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
    <img
      src={photoURL || '/default-avatar.png'}
      alt={name}
      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-700 shadow-md"
    />
    <h2 className="text-xl font-bold mb-1 text-gray-900">{name}</h2>
    <p className="text-sm text-gray-600 mb-3">{bio}</p>
    <div className="flex flex-wrap justify-center gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default ProfileCard;
