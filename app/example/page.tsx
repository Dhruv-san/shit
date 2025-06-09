"use client";

import DecryptedText from '@/components/DecryptedText';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">DecryptedText Examples</h1>
      
      <div className="space-y-12">
        {/* Example 1: Defaults (hover to decrypt) */}
        <div className="p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Default Hover Effect</h2>
          <DecryptedText 
            text="Hover me to see the decryption effect!" 
            className="text-blue-400"
            encryptedClassName="text-gray-600"
          />
        </div>

        {/* Example 2: Customized speed and characters */}
        <div className="p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Customized Animation</h2>
          <DecryptedText
            text="Custom speed and characters"
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            className="text-green-400"
            parentClassName="block text-lg"
            encryptedClassName="text-purple-600"
          />
        </div>

        {/* Example 3: Animate on view (runs once) */}
        <div className="p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">View Animation</h2>
          <DecryptedText
            text="This text animates when scrolled into view!"
            animateOn="view"
            revealDirection="center"
            className="text-yellow-400"
            encryptedClassName="text-gray-600"
            sequential={true}
          />
        </div>

        {/* Example 4: Different reveal directions */}
        <div className="p-6 bg-gray-900 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4">Reveal Directions</h2>
          <DecryptedText
            text="Reveal from start"
            revealDirection="start"
            sequential={true}
            className="text-pink-400 block"
            encryptedClassName="text-gray-600"
          />
          <DecryptedText
            text="Reveal from end"
            revealDirection="end"
            sequential={true}
            className="text-indigo-400 block"
            encryptedClassName="text-gray-600"
          />
          <DecryptedText
            text="Reveal from center"
            revealDirection="center"
            sequential={true}
            className="text-cyan-400 block"
            encryptedClassName="text-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
