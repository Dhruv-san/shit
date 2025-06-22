"use client";
import { useState } from "react";
import { nhost } from "@/lib/nhost";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    preferredLocation: "",
    education: "",
    employment: "",
    skills: "",
    expertise: "",
    accomplishments: "",
    role: "",
    lookingForSkills: "",
    lookingForExperience: "",
    lookingForCommitment: "",
    workingStyle: "",
    lookingForTraits: "",
    lookingForGeography: "",
    industryInterest: "",
    motivation: "",
    goals: "",
    runway: "",
    exclusive: "",
    companyName: "",
    companyUrl: "",
    demoUrl: "",
    shortDesc: "",
    longDesc: "",
    category: "",
    progress: "",
    timeOnIdea: "",
    users: "",
    revenue: "",
    milestones: "",
    revenueModel: "",
    competitors: "",
    uniqueInsight: "",
    goToMarket: "",
    legal: "",
    equity: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const { error } = await nhost.graphql.request(
        `mutation UpsertProfile($object: profiles_insert_input!) {
          insert_profiles_one(object: $object, on_conflict: {constraint: profiles_pkey, update_columns: [name, email, phone, city, country, preferred_location, education, employment, skills, expertise, accomplishments, role, looking_for_skills, looking_for_experience, looking_for_commitment, working_style, looking_for_traits, looking_for_geography, industry_interest, motivation, goals, runway, exclusive, company_name, company_url, demo_url, short_desc, long_desc, category, progress, time_on_idea, users, revenue, milestones, revenue_model, competitors, unique_insight, go_to_market, legal, equity, video_url]}) {
            id
          }
        }`,
        { object: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          country: form.country,
          preferred_location: form.preferredLocation,
          education: form.education,
          employment: form.employment,
          skills: form.skills,
          expertise: form.expertise,
          accomplishments: form.accomplishments,
          role: form.role,
          looking_for_skills: form.lookingForSkills,
          looking_for_experience: form.lookingForExperience,
          looking_for_commitment: form.lookingForCommitment,
          working_style: form.workingStyle,
          looking_for_traits: form.lookingForTraits,
          looking_for_geography: form.lookingForGeography,
          industry_interest: form.industryInterest,
          motivation: form.motivation,
          goals: form.goals,
          runway: form.runway,
          exclusive: form.exclusive,
          company_name: form.companyName,
          company_url: form.companyUrl,
          demo_url: form.demoUrl,
          short_desc: form.shortDesc,
          long_desc: form.longDesc,
          category: form.category,
          progress: form.progress,
          time_on_idea: form.timeOnIdea,
          users: form.users,
          revenue: form.revenue,
          milestones: form.milestones,
          revenue_model: form.revenueModel,
          competitors: form.competitors,
          unique_insight: form.uniqueInsight,
          go_to_market: form.goToMarket,
          legal: form.legal,
          equity: form.equity,
          video_url: form.videoUrl,
        }}
      );
      setLoading(false);
      if (error) setError((error as any)?.message || "An error occurred");
      else {
        setSuccess(true);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8EDED]">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-[#FF8225]/30 overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#173B45]">Your Profile</h2>
        {/* Basic Contact Information */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="city">Current City</label>
            <input id="city" name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="country">Country</label>
            <input id="country" name="country" value={form.country} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" required />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="preferredLocation">Preferred Location for Company</label>
            <input id="preferredLocation" name="preferredLocation" value={form.preferredLocation} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        {/* Background & Experience */}
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="education">Education (Degrees, Universities, Fields of Study)</label>
          <textarea id="education" name="education" value={form.education} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="employment">Employment History (Companies, Roles, Duration)</label>
          <textarea id="employment" name="employment" value={form.employment} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="skills">Skills (Technical, Business, Soft Skills)</label>
          <textarea id="skills" name="skills" value={form.skills} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="expertise">Areas of Expertise/Domain Expertise</label>
          <textarea id="expertise" name="expertise" value={form.expertise} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="accomplishments">Impressive Accomplishments</label>
          <textarea id="accomplishments" name="accomplishments" value={form.accomplishments} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        {/* What You're Looking For */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="role">Your Role/Contribution</label>
            <input id="role" name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="lookingForSkills">Co-founder Skills Sought</label>
            <input id="lookingForSkills" name="lookingForSkills" value={form.lookingForSkills} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="lookingForExperience">Co-founder Experience Level</label>
            <input id="lookingForExperience" name="lookingForExperience" value={form.lookingForExperience} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="lookingForCommitment">Co-founder Commitment Level</label>
            <input id="lookingForCommitment" name="lookingForCommitment" value={form.lookingForCommitment} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="workingStyle">Working Style Preferences</label>
            <input id="workingStyle" name="workingStyle" value={form.workingStyle} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="lookingForTraits">Personality Traits/Values</label>
            <input id="lookingForTraits" name="lookingForTraits" value={form.lookingForTraits} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="lookingForGeography">Geographic Preferences</label>
            <input id="lookingForGeography" name="lookingForGeography" value={form.lookingForGeography} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="industryInterest">Industry/Idea Interest</label>
            <input id="industryInterest" name="industryInterest" value={form.industryInterest} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        {/* Commitment & Motivation */}
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="motivation">Why do you want to start a startup?</label>
          <textarea id="motivation" name="motivation" value={form.motivation} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="goals">Your long-term goals</label>
          <textarea id="goals" name="goals" value={form.goals} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="runway">Financial situation/runway</label>
            <input id="runway" name="runway" value={form.runway} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="exclusive">Willingness to commit exclusively</label>
            <input id="exclusive" name="exclusive" value={form.exclusive} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        {/* Startup Idea/Company Information */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="companyName">Company Name</label>
            <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="companyUrl">Company URL</label>
            <input id="companyUrl" name="companyUrl" value={form.companyUrl} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="demoUrl">Demo URL</label>
            <input id="demoUrl" name="demoUrl" value={form.demoUrl} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="shortDesc">Short Description (50 chars or less)</label>
          <input id="shortDesc" name="shortDesc" value={form.shortDesc} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" maxLength={50} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="longDesc">Detailed Description</label>
          <textarea id="longDesc" name="longDesc" value={form.longDesc} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={3} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="category">Category/Industry</label>
          <input id="category" name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="progress">Progress So Far</label>
          <textarea id="progress" name="progress" value={form.progress} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="timeOnIdea">How long working on this?</label>
            <input id="timeOnIdea" name="timeOnIdea" value={form.timeOnIdea} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="users">Active Users</label>
            <input id="users" name="users" value={form.users} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="revenue">Revenue</label>
            <input id="revenue" name="revenue" value={form.revenue} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="milestones">Milestones Achieved</label>
            <input id="milestones" name="milestones" value={form.milestones} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="revenueModel">Revenue Model</label>
          <input id="revenueModel" name="revenueModel" value={form.revenueModel} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="competitors">Competitors</label>
          <input id="competitors" name="competitors" value={form.competitors} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="uniqueInsight">Why this idea? Unique insight/domain expertise</label>
          <textarea id="uniqueInsight" name="uniqueInsight" value={form.uniqueInsight} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="goToMarket">How will you get users/customers? (Go-to-market strategy)</label>
          <textarea id="goToMarket" name="goToMarket" value={form.goToMarket} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="legal">Legal Structure</label>
            <input id="legal" name="legal" value={form.legal} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="equity">Equity Split (if not incorporated)</label>
            <input id="equity" name="equity" value={form.equity} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[#173B45] mb-2" htmlFor="videoUrl">Video Introduction (YouTube URL)</label>
          <input id="videoUrl" name="videoUrl" value={form.videoUrl} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
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
