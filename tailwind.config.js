/** Vastrayan Textiles – Tailwind config. Rebuild CSS with: npm run build */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f2ea",
        linen: "#efe6d9",
        sand: "#d9c4a3",
        taupe: "#a89e8e",
        stone: "#9b9595",
        blush: "#d7ab9b",
        mocha: "#8a7565",
        cocoa: "#4a3b32",
        ink: "#2a2420",
        thread: "#e60023",
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 18px 40px -18px rgba(74,59,50,.35)",
        lift: "0 30px 60px -22px rgba(74,59,50,.45)",
      },
    },
  },
  plugins: [],
};
