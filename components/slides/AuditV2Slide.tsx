'use client'

interface AuditV2SlideProps {
  isDarkMode?: boolean;
}

export default function AuditV2Slide({ isDarkMode = false }: AuditV2SlideProps) {
  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            SEO Audit — v2
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-4">
            PYD Agency - Comprehensive Analysis & Strategic Roadmap
          </h2>
          <p className="text-lg italic text-opacity-60">
            Version 2 — Updated June 2026. Supersedes the v1 baseline (analytics window: March–September 2025).
          </p>
        </div>

        {/* How to Read This Version */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-4">How To Read This Version</h3>
          <p className="text-base leading-relaxed mb-4">
            This is a revision of the original audit, not a from-scratch rebuild. Technical and on-page sections were re-verified against the live site in June 2026. Analytics, keyword, authority, and local sections rely on Ahrefs/GSC data that could not be regenerated in this pass (see the AhrefsBot note in Section 7) and are carried forward from the v1 baseline, clearly marked for refresh.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-lg mb-3">Status Legend (added in v2):</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="font-semibold text-green-600 dark:text-green-400">Resolved</span> — flagged in v1, confirmed fixed on the live site</li>
              <li><span className="font-semibold text-red-600 dark:text-red-400">Open</span> — confirmed still present, June 2026</li>
              <li><span className="font-semibold text-blue-600 dark:text-blue-400">New</span> — not in v1; surfaced in the June 2026 review</li>
              <li><span className="font-semibold text-purple-600 dark:text-purple-400">Corrected</span> — v1 guidance was outdated or inaccurate and has been revised</li>
              <li><span className="font-semibold text-yellow-600 dark:text-yellow-400">Pending refresh</span> — depends on Ahrefs/GSC data; not verifiable in this pass</li>
            </ul>
          </div>
        </section>

        {/* Version 2 Update Summary */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Version 2 Update Summary</h3>

          {/* What Changed Since v1 */}
          <div className="mb-8">
            <h4 className="text-2xl font-semibold mb-4">0. What Changed Since v1</h4>

            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-3 text-green-800 dark:text-green-300">Resolved since baseline:</h5>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>XML sitemaps are now live and well-structured: a sitemap index referencing a static <code>sitemap-0.xml</code>, a dynamic <code>server-sitemap/talents.xml</code> (all 47 talents), and an articles sitemap — all declared in <code>robots.txt</code>. The v1 "missing 47 pages / sitemap not generated" findings no longer apply.</li>
                  <li><code>robots.txt</code> is now configured with sitemap declarations and a host directive (v1: "needs configuration review").</li>
                  <li>Talent pages now ship unique, server-rendered <code>&lt;title&gt;</code> and meta description tags. The v1 "missing meta elements" critique is largely addressed — the remaining issue is quality, not absence.</li>
                  <li>Canonicalization at the host level is clean: http→https and non-www→www all 301 to <code>https://www.pyd.agency/</code>.</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-3 text-red-800 dark:text-red-300">Critical new development:</h5>
                <p className="text-sm mb-2">
                  <code>robots.txt</code> now blocks AhrefsBot site-wide (<code>Disallow: /</code>). This is the data source the entire v1 report was built on. Until it is removed or ownership is verified in Ahrefs, no Ahrefs-based section of this report can be refreshed. <strong>This is the single most important item to action.</strong>
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-300">New on-page findings:</h5>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Generic H1s — the homepage h1 is "Home"; talent pages use first name only ("Aaron" rather than "Aaron Thornton").</li>
                  <li>No <code>rel=canonical</code> tags on any page (host redirects do not substitute for self-referencing canonicals).</li>
                  <li>Meta-description template bug — a missing space ("Talent All.Book with us") and redundant "in Talent All" phrasing across all 47 talent pages.</li>
                  <li>The articles sitemap exists but is empty (0 URLs) — editorial plumbing is in place with no content behind it.</li>
                  <li>The mobile viewport disables pinch-zoom (<code>maximum-scale=1</code>) — an accessibility and mobile-usability issue.</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-3 text-purple-800 dark:text-purple-300">Corrected guidance:</h5>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Removed the AMP recommendation — AMP carries no ranking benefit in 2026 and is effectively legacy.</li>
                  <li>Date-stamped all analytics/authority figures as the March–September 2025 baseline rather than current.</li>
                  <li>Reconciled inconsistent page counts (v1 alternated between 10, 41, and 88).</li>
                  <li>Softened modeled revenue figures that were presented as hard data.</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-3 text-yellow-800 dark:text-yellow-300">Still open and confirmed:</h5>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Zero structured data anywhere (0% schema coverage) — confirmed live.</li>
                  <li>Suboptimal URL structure <code>/talent/all/[id]/[name]</code> — unchanged.</li>
                  <li>Weak crawlable internal linking — confirmed (~4 links in the homepage source).</li>
                  <li>Portfolio images are client-rendered and absent from server HTML — invisible to Google Images.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Sections Summary Grid */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Key Findings by Section</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical SEO */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-3">Technical SEO (§5-17)</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-green-600 font-semibold">✓</span> Sitemaps now live & structured</p>
                <p><span className="text-green-600 font-semibold">✓</span> Clean host canonicalization</p>
                <p><span className="text-green-600 font-semibold">✓</span> Server-rendered meta tags</p>
                <p><span className="text-red-600 font-semibold">✗</span> 0% structured data coverage</p>
                <p><span className="text-red-600 font-semibold">✗</span> AhrefsBot blocked site-wide</p>
                <p><span className="text-red-600 font-semibold">✗</span> Weak internal linking</p>
              </div>
            </div>

            {/* On-Page SEO */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-3">On-Page SEO (§20-22)</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-green-600 font-semibold">✓</span> Unique titles & meta descriptions</p>
                <p><span className="text-red-600 font-semibold">✗</span> Generic H1s ("Home", first names)</p>
                <p><span className="text-red-600 font-semibold">✗</span> No rel=canonical tags</p>
                <p><span className="text-red-600 font-semibold">✗</span> Meta description template bug</p>
                <p><span className="text-red-600 font-semibold">✗</span> Portfolio images client-rendered</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-3">Analytics (§2-4, 11-12)</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-yellow-600 font-semibold">⚠</span> Pending GSC data refresh</p>
                <p><span className="text-yellow-600 font-semibold">⚠</span> Baseline: March-Sept 2025</p>
                <p className="text-gray-600 dark:text-gray-400">Health score: 2.5/10 (likely higher now)</p>
                <p className="text-gray-600 dark:text-gray-400">DR ~0.4 → 3.3 (baseline window)</p>
              </div>
            </div>

            {/* Keywords & Content */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-3">Keywords & Content (§18-25)</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-yellow-600 font-semibold">⚠</span> Position data pending refresh</p>
                <p><span className="text-blue-600 font-semibold">→</span> Commercial intent opportunity</p>
                <p><span className="text-blue-600 font-semibold">→</span> Category structure needed</p>
                <p className="text-gray-600 dark:text-gray-400">Brand term underperforming</p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Recommendations */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Priority Recommendations (v2)</h3>

          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">1. Remove AhrefsBot block (§7)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Critical for restoring SEO monitoring and reporting capabilities</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <p className="font-semibold">2. Ship structured data (§13)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Organization/LocalBusiness + Person schema on all talent pages</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">3. Fix on-page quality (§20)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">H1s, meta-description template, rel=canonical tags</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">4. Server-render portfolio imagery (§9, §20)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Critical for Google Images SEO and LCP performance</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">5. Strengthen internal linking (§6)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add crawlable links and breadcrumbs in server HTML</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">6. Plan URL structure migration (§8)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Migrate to /models/[name] with 301 redirects</p>
            </div>

            <div className="border-l-4 border-gray-500 pl-4 py-2">
              <p className="font-semibold">7. Refresh analytics sections (§2-4, 11-12, 16, 18-29)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pull current data from GSC once AhrefsBot access restored</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <p className="text-sm opacity-70 italic">
            End of v2. Technical and on-page sections reflect the live site as of June 2026. Analytics, keyword, local, and off-page sections are carried forward from the March–September 2025 baseline and marked for refresh; most require restoring Ahrefs access or pulling current Google Search Console data.
          </p>
        </div>
      </div>
    </div>
  );
}
