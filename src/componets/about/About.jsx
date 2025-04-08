import React from 'react';
import '../../../src/about.css';

export default function AboutPage() {
  return (
        <div className="about-container">
          <div className="about-header">
            <h1>Beauty Lingerie</h1>
            <p>Kyustendil's premier destination for luxury lingerie since 2015 - where sophistication meets comfort</p>
          </div>
    
          <div className="about-content">
            <div className="about-story">
              <h2>Our Heritage</h2>
              <p>Founded in the heart of Kyustendil by Kalinka Bojilova, Beauty Lingerie began as a small boutique with a curated selection of European lingerie. Today, we've grown into the region's most trusted intimate apparel destination, while maintaining our commitment to personalized service.</p>
              <p>What sets us apart is our deep understanding of Bulgarian women's needs - combining international trends with local preferences for quality and fit.</p>
            </div>
    
            <div className="about-mission">
              <h2>Our Philosophy</h2>
              <p>We believe every woman deserves lingerie that makes her feel confident and comfortable. Our expert fitters take time to understand your body and lifestyle, recommending pieces that flatter your unique shape.</p>
              <p>As Kyustendil's lingerie specialists, we bridge global luxury brands with Bulgarian craftsmanship, offering exclusive collections you won't find elsewhere in the region.</p>
            </div>
          </div>
    
          <div className="values-section">
            <h2>Our Commitments</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Expert Fittings</h3>
                <p>Our certified specialists provide discreet, professional fittings to ensure perfect comfort and support.</p>
              </div>
              <div className="value-card">
                <h3>Quality Assurance</h3>
                <p>Every piece meets our strict standards for fabric quality, construction, and durability.</p>
              </div>
              <div className="value-card">
                <h3>Local Connection</h3>
                <p>We support Bulgarian designers while bringing you the best European lingerie brands.</p>
              </div>
              <div className="value-card">
                <h3>Discretion Guaranteed</h3>
                <p>Your privacy is paramount in our welcoming Kyustendil boutique.</p>
              </div>
            </div>
          </div>
    
          <div className="location-section">
            <h2>Visit Our Kyustendil Boutique</h2>
            <p>Find us at: ul. "Geo Milev" 18, Kyustendil</p>
            <p>Opening Hours: Monday-Friday 10:00-19:00, Saturday 10:00-15:00</p>
          </div>
        </div>
      );
};
