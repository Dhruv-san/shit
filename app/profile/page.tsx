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
    employment_history: [{ company: "", role: "", duration: "" }],
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

  // Employment history handlers
  const handleEmploymentChange = (idx: number, field: string, value: string) => {
    const updated = form.employment_history.map((job, i) =>
      i === idx ? { ...job, [field]: value } : job
    );
    setForm({ ...form, employment_history: updated });
  };
  const addEmployment = () => {
    setForm({ ...form, employment_history: [...form.employment_history, { company: "", role: "", duration: "" }] });
  };
  const removeEmployment = (idx: number) => {
    setForm({ ...form, employment_history: form.employment_history.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const { error } = await nhost.graphql.request(
        `mutation UpsertProfile($object: profiles_insert_input!) {
          insert_profiles_one(object: $object, on_conflict: {constraint: profiles_pkey, update_columns: [name, email, phone, city, country, preferred_location, education, employment_history, skills, expertise, accomplishments, role, looking_for_skills, looking_for_experience, looking_for_commitment, working_style, looking_for_traits, looking_for_geography, industry_interest, motivation, goals, runway, exclusive, company_name, company_url, demo_url, short_desc, long_desc, category, progress, time_on_idea, users, revenue, milestones, revenue_model, competitors, unique_insight, go_to_market, legal, equity, video_url]}) {
            id
          }
        }`,
        { object: {
          ...form,
          preferred_location: form.preferredLocation,
          employment_history: form.employment_history,
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
        {/* Employment History (JSON array) */}
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2">Employment History</label>
          {form.employment_history.map((job, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Company"
                value={job.company}
                onChange={e => handleEmploymentChange(idx, "company", e.target.value)}
                className="flex-1 px-2 py-1 border border-[#FF8225]/30 rounded-lg bg-[#F8EDED] text-[#173B45]"
              />
              <input
                type="text"
                placeholder="Role"
                value={job.role}
                onChange={e => handleEmploymentChange(idx, "role", e.target.value)}
                className="flex-1 px-2 py-1 border border-[#FF8225]/30 rounded-lg bg-[#F8EDED] text-[#173B45]"
              />
              <input
                type="text"
                placeholder="Duration"
                value={job.duration}
                onChange={e => handleEmploymentChange(idx, "duration", e.target.value)}
                className="flex-1 px-2 py-1 border border-[#FF8225]/30 rounded-lg bg-[#F8EDED] text-[#173B45]"
              />
              <button type="button" onClick={() => removeEmployment(idx)} className="text-[#B43F3F] font-bold px-2">×</button>
            </div>
          ))}
          <button type="button" onClick={addEmployment} className="mt-2 px-4 py-1 bg-[#FF8225] text-white rounded-lg">Add Job</button>
        </div>
        {/* Background & Experience */}
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="education">Education (Degrees, Universities, Fields of Study)</label>
          <textarea id="education" name="education" value={form.education} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="skills">Skills (Technical, Business, Soft Skills)</label>
          <textarea id="skills" name="skills" value={form.skills} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="role">Your Role/Contribution</label>
          <input id="role" name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="expertise">Areas of Expertise/Domain Expertise</label>
          <textarea id="expertise" name="expertise" value={form.expertise} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingForSkills">Co-founder Skills Sought</label>
          <input id="lookingForSkills" name="lookingForSkills" value={form.lookingForSkills} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="accomplishments">Impressive Accomplishments</label>
          <textarea id="accomplishments" name="accomplishments" value={form.accomplishments} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" rows={2} />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingForExperience">Co-founder Experience Level</label>
          <input id="lookingForExperience" name="lookingForExperience" value={form.lookingForExperience} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingForCommitment">Co-founder Commitment Level</label>
          <input id="lookingForCommitment" name="lookingForCommitment" value={form.lookingForCommitment} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="workingStyle">Working Style Preferences</label>
          <input id="workingStyle" name="workingStyle" value={form.workingStyle} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingForTraits">Personality Traits/Values</label>
          <input id="lookingForTraits" name="lookingForTraits" value={form.lookingForTraits} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="lookingForGeography">Geographic Preferences</label>
          <input id="lookingForGeography" name="lookingForGeography" value={form.lookingForGeography} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="industryInterest">Industry/Idea Interest</label>
          <input id="industryInterest" name="industryInterest" value={form.industryInterest} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
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
            <label className="block text-[#173B45] mb-2" htmlFor="exclusive">Willingness to commit exclusively</label>
            <input id="exclusive" name="exclusive" value={form.exclusive} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="timeOnIdea">How long working on this?</label>
            <input id="timeOnIdea" name="timeOnIdea" value={form.timeOnIdea} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="users">Active Users</label>
            <input id="users" name="users" value={form.users} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
          <div>
            <label className="block text-[#173B45] mb-2" htmlFor="companyName">Company Name</label>
            <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="legal">Legal Structure</label>
          <input id="legal" name="legal" value={form.legal} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="equity">Equity Split (if not incorporated)</label>
          <input id="equity" name="equity" value={form.equity} onChange={handleChange} className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]" />
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