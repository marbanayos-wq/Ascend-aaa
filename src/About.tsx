import React from 'react';
import { motion } from 'motion/react';
import { BRAND_NAME, BRAND_OWNER, BRAND_TAGLINE } from './constants';
import { PhilippineFlag } from './components/PhilippineFlag';

export const About = () => {
  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/filipino-gym-about/1920/1080?grayscale"
            alt="About ASCEND"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Flag Badge */}
        <div className="absolute top-12 right-12 z-20">
          <PhilippineFlag className="w-10 h-6 rounded-sm shadow-xl opacity-60" />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-8xl font-black italic tracking-tighter text-white mb-4 uppercase"
          >
            Our Story
          </motion.h1>
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm sm:text-base">
            {BRAND_TAGLINE}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-8 leading-tight italic uppercase tracking-tighter">
              Built for Athletes, <br />
              By Athletes.
            </h2>
            <div className="space-y-6 text-lg text-primary/70 leading-relaxed font-medium">
              <p>
                ASCEND is a high-performance sportswear brand created for athletes and active individuals who want to rise above limits. Founded by {BRAND_OWNER}, ASCEND combines performance, strength, and style into every product.
              </p>
              <p>
                Our journey began with a simple observation: athletes needed gear that could keep up with their intensity without compromising on aesthetic. We spent months researching fabrics, testing prototypes, and refining designs to create what is now the ASCEND collection.
              </p>
              <p>
                As a local brand, we are committed to showcasing excellence on the global stage, proving that our craftsmanship and innovation are second to none.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/filipino-man-fitness/800/1000"
                alt={BRAND_OWNER}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary text-white p-10 rounded-2xl shadow-2xl max-w-xs">
              <p className="text-accent font-bold uppercase tracking-widest text-xs mb-2">Founder & Owner</p>
              <h3 className="text-xl font-black uppercase italic tracking-tighter">{BRAND_OWNER}</h3>
            </div>
          </motion.div>
        </div>

        {/* Mission/Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { title: "Mission", text: "To empower every individual to reach their peak potential through high-performance apparel that inspires confidence and strength." },
            { title: "Vision", text: "To become the global standard for performance sportswear, recognized for our innovation, quality, and community-driven approach." },
            { title: "Values", text: "Excellence, Integrity, and Resilience. We believe in the power of the human spirit to overcome any obstacle." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center"
            >
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 text-accent">{item.title}</h3>
              <p className="text-primary/60 leading-relaxed font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Excellence",
                  description: "We strive for perfection in every stitch and seam, ensuring our gear meets the highest standards of performance."
                },
                {
                  title: "Community",
                  description: "ASCEND is more than a brand; it's a movement of athletes supporting athletes in their journey to the top."
                },
                {
                  title: "Innovation",
                  description: "Constantly pushing the boundaries of sportswear technology to provide you with the ultimate competitive edge."
                }
              ].map((value, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-accent text-4xl font-black italic mb-4">0{idx + 1}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
