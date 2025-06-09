"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getGraphQLClient } from "@/lib/nhost";

const UPDATE_PROFILE = `
  mutation UpdateProfile(
    $user_id: uuid!,
    $name: String!,
    $tagline: String!,
    $skills: _text!,
    $interests: _text!,
    $availability: String!,
    $looking_for: _text!,
    $location: String!,
    $portfolio: String!
  ) {
    update_profiles(
      where: { id: { _eq: $user_id } },
      _set: {
        name: $name,
        tagline: $tagline,
        skills: $skills,
        interests: $interests,
        availability: $availability,
        looking_for: $looking_for,
        location: $location,
        portfolio: $portfolio
      }
    ) {
      affected_rows
    }
  }
`;

const GET_PROFILE = `
  query GetProfile($user_id: uuid!) {
    profiles(where: { id: { _eq: $user_id } }) {
      name
      tagline
      skills
      interests
      availability
      looking_for
      location
      portfolio
    }
  }
`;

interface Profile {
  name: string;
  tagline: string;
  skills: string[];
  interests: string[];
  availability: string;
  lookingFor: string[];
  location: string;
  portfolio: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState<Profile>({
    name: "",
    tagline: "",
    skills: [],
    interests: [],
    availability: "",
    lookingFor: [],
    location: "",
    portfolio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const response = await getGraphQLClient().request(GET_PROFILE, {
          user_id: user.id
        });
        
        if (response.profiles && response.profiles[0]) {
          setForm(response.profiles[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const skillsList = ["Frontend", "Backend", "UI/UX", "Marketing", "Finance", "Product"];
  const interestsList = ["HealthTech", "EdTech", "AI", "Social", "E-commerce"];
  const lookingForList = ["Technical Cofounder", "Marketing Cofounder", "Business Cofounder"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheckbox = (listName: keyof Profile, value: string) => {
    const current = form[listName] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setForm({ ...form, [listName]: updated });
  };

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    const formData = {
      ...form,
      skills: JSON.stringify(form.skills),
      interests: JSON.stringify(form.interests),
      looking_for: JSON.stringify(form.lookingFor)
    };
    
    try {
      await getGraphQLClient().request(UPDATE_PROFILE, {
        ...formData,
        user_id: user.id
      });
      setShowPopup(true);
      // Give users a chance to see the success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Push to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 relative">
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Profile saved successfully! Redirecting...
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 shadow-2xl rounded-3xl p-10 w-full max-w-2xl space-y-6 border border-blue-900/20 animate-fade-in"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-white animate-slide-down">Build Your Cofindr Profile</h1>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-blue-900/20 rounded bg-black/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
          required
        />
        <input
          type="text"
          name="tagline"
          placeholder="1-line Bio (e.g. Passionate AI Builder)"
          value={form.tagline}
          onChange={handleChange}
          className="w-full p-3 border border-blue-900/20 rounded bg-black/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <fieldset>
          <label className="font-semibold text-blue-200">Skills:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillsList.map((skill) => (
              <label key={skill} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.skills.includes(skill)}
                  onChange={() => toggleCheckbox("skills", skill)}
                  className="mr-1 accent-blue-700"
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <label className="font-semibold text-blue-200">Startup Interests:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestsList.map((interest) => (
              <label key={interest} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.interests.includes(interest)}
                  onChange={() => toggleCheckbox("interests", interest)}
                  className="mr-1 accent-blue-700"
                />
                {interest}
              </label>
            ))}
          </div>
        </fieldset>
        <input
          type="number"
          name="availability"
          placeholder="Availability (hrs/week)"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-3 border border-blue-900/20 rounded bg-black/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <fieldset>
          <label className="font-semibold text-blue-200">Looking For:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {lookingForList.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.lookingFor.includes(type)}
                  onChange={() => toggleCheckbox("lookingFor", type)}
                  className="mr-1 accent-blue-700"
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>
        <input
          type="text"
          name="location"
          placeholder="Location (City, Country)"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border border-blue-900/20 rounded bg-black/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio / LinkedIn"
          value={form.portfolio}
          onChange={handleChange}
          className="w-full p-3 border border-blue-900/20 rounded bg-black/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? 'bg-blue-500' : 'bg-blue-700 hover:bg-blue-800'
          } text-white py-3 rounded-xl font-bold shadow-lg transition-all animate-pop flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Profile'
          )}
        </button>
      </form>
      <div className="mt-10 text-blue-200 text-xs opacity-70 text-center z-10 relative animate-fade-in">
        &copy; {new Date().getFullYear()} Cofindr. All rights reserved.
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 1.1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}

