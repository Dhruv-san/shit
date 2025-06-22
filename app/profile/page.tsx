"use client";
import { useState } from "react";
import { nhost } from "@/lib/nhost";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    skills: "",
    lookingFor: "",
    linkedin: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // Replace with your Nhost mutation for upserting profile
    const { error } = await nhost.graphql.request(
      `mutation UpsertProfile($object: profiles_insert_input!) {
        insert_profiles_one(object: $object, on_conflict: {constraint: profiles_pkey, update_columns: [name, email, role, bio, skills, looking_for, linkedin, website]}) {
          id
        }
      }`,
      { object: {
        name: form.name,
        email: form.email,
        role: form.role,
        bio: form.bio,
        skills: form.skills,
        looking_for: form.lookingFor,
        linkedin: form.linkedin,
        website: form.website,
      }}
    );
    setLoading(false);
    if (error) setError((error as any)?.message || "An error occurred");
    else setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8EDED]">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-[#FF8225]/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#173B45]">Your Profile</h2>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="role">Role (e.g. Founder, Engineer, Designer)</label>
          <input id="role" name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="bio">Short Bio</label>
          <textarea id="bio" name="bio" value={form.bio} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={3} required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="skills">Skills (comma separated)</label>
          <input id="skills" name="skills" value={form.skills} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingFor">Looking For (e.g. Technical Co-founder, Marketer)</label>
          <input id="lookingFor" name="lookingFor" value={form.lookingFor} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="linkedin">LinkedIn</label>
          <input id="linkedin" name="linkedin" value={form.linkedin} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-6">
          <label className="block text-[#173B45] mb-2" htmlFor="website">Website</label>
          <input id="website" name="website" value={form.website} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        {error && <div className="mb-4 text-[#B43F3F] text-center text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center text-sm">Profile saved!</div>}
        <button type="submit" disabled={loading} className="w-full bg-[#FF8225] hover:bg-[#B43F3F] text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
