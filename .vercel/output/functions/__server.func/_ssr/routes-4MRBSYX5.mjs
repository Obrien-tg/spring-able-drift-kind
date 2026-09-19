import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, n as SignedIn, r as SignedOut } from "./utils-OBPSrjs4.mjs";
import { b as Check, c as Star, d as Palette, f as MessageCircle, g as Gamepad2, h as Heart, i as Trophy, l as Sparkles, n as Users, s as Sun, u as Puzzle, x as BookOpen, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { t as Card } from "./card-BWVJrU2j.mjs";
import { t as SiteHeader } from "./site-header-1x8m3mAE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-4MRBSYX5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setOn(true);
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("reveal", on && "reveal-in", className),
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
var steps = [
	{
		n: "01",
		title: "Sign up",
		body: "Create a student or parent account in a minute. No clutter, just a warm welcome."
	},
	{
		n: "02",
		title: "Meet your tutor",
		body: "Patience (and Ollie) greet you, learn your pace, and pick a starting lesson."
	},
	{
		n: "03",
		title: "Learn & practice",
		body: "Work through lessons, games, and assignments with feedback you can actually use."
	},
	{
		n: "04",
		title: "Celebrate success",
		body: "Stars, scores, and family updates make progress visible — and worth cheering."
	}
];
var subjects = [
	{
		name: "Mathematics",
		blurb: "Number sense, fractions, times tables, and calm problem solving.",
		grades: "Grades 1–7",
		icon: Sparkles
	},
	{
		name: "English",
		blurb: "Reading, spelling, comprehension, and story-building.",
		grades: "Grades 1–7",
		icon: BookOpen
	},
	{
		name: "Science",
		blurb: "Living things, weather, water, magnets — curious questions first.",
		grades: "Grades 1–7",
		icon: Sun
	},
	{
		name: "Creative Arts",
		blurb: "Colour, drawing, and making, so ideas have somewhere to go.",
		grades: "Grades 1–7",
		icon: Palette
	}
];
var services = [
	{
		n: "01",
		title: "Personal tutoring",
		body: "One-to-one sessions that follow the learner, not a script."
	},
	{
		n: "02",
		title: "Family messaging",
		body: "A class lounge for students, parents, and the teacher."
	},
	{
		n: "03",
		title: "Lessons hub",
		body: "Worksheets, stories, and investigations in one clear place."
	},
	{
		n: "04",
		title: "Progress tracking",
		body: "Milestones and scores without hunting through menus."
	},
	{
		n: "05",
		title: "Parent visibility",
		body: "See assignments, feedback, and how the week is going."
	},
	{
		n: "06",
		title: "Practice games",
		body: "Short quizzes that turn revision into a small adventure."
	}
];
var plans = [
	{
		name: "Starter",
		price: "R150",
		note: "per month",
		points: [
			"1 subject focus",
			"Weekly lesson pack",
			"Parent progress note"
		]
	},
	{
		name: "Learner",
		price: "R350",
		note: "per month · most families",
		popular: true,
		points: [
			"Up to 3 subjects",
			"Assignments with feedback",
			"Practice games + lounge"
		]
	},
	{
		name: "Scholar",
		price: "R550",
		note: "per month",
		points: [
			"All subjects, Grades 1–7",
			"Priority marking",
			"Weekly challenge + reports"
		]
	}
];
var reviews = [
	{
		quote: "My Grade 3 finally enjoys fractions. The lessons feel like a story, not a scolding.",
		name: "Thandi M.",
		role: "Parent"
	},
	{
		quote: "Ollie is funny and the quizzes are short. I like seeing the stars go up.",
		name: "Lerato",
		role: "Grade 5 student"
	},
	{
		quote: "I can check homework from my phone after work. Clear, kind, and organised.",
		name: "James K.",
		role: "Parent"
	}
];
var faqs = [
	{
		q: "Which grades do you teach?",
		a: "Primary school, Grades 1–7, with Mathematics, English, Science, and Creative Arts."
	},
	{
		q: "How do sessions work?",
		a: "Families sign in, open the hub, and follow the week’s lessons. Live notes go through the Class Lounge. Patience sets the pace for each child."
	},
	{
		q: "What is in each plan?",
		a: "Starter is a gentle single-subject month. Learner covers most families with three subjects and marking. Scholar is the full programme plus weekly challenges."
	},
	{
		q: "Can parents see progress?",
		a: "Yes. A parent account links to the student’s email and opens the same assignments, scores, and feedback."
	},
	{
		q: "Is this only online?",
		a: "The hub is built for families on phones and laptops. In-person sessions can be arranged directly with Patience."
	},
	{
		q: "How do we start?",
		a: "Create a student or parent account, pick a role, and open the first lesson. Ollie will be in the lounge if you get stuck."
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subjects, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fun, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cta, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "home",
		className: "relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "Primary school tutoring · Patience Gwanyanya"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-xl text-[clamp(2rem,5vw,3.4rem)]",
					children: "Learning made fun and easy for kids and families."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-base text-muted-foreground sm:text-lg",
					children: "Personal tutoring that follows your child’s pace — lessons, practice, progress, and a kind place to ask for help."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "cta-glow",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "student"
							},
							children: "Register as a student"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { mode: "signin" },
							children: "Sign in"
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "cta-glow",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Go to dashboard"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#subjects",
							children: "Explore subjects"
						})
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center gap-3 rounded-[22px] border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/mascot-owl.jpg",
						alt: "",
						className: "size-12 rounded-2xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Meet Ollie"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Your study buddy in the Class Lounge."
					})] })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-kids-learning.jpg",
					alt: "Illustrated children learning with Ollie the owl",
					className: "w-full rounded-[32px] object-cover shadow-[var(--shadow-lift)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/mascot-owl.jpg",
					alt: "Ollie the owl mascot",
					className: "mascot-float absolute -bottom-6 -left-3 w-28 rounded-[28px] object-cover shadow-[var(--shadow-lift)] sm:-left-6 sm:w-36"
				})]
			})]
		})
	});
}
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Four calm steps from hello to high five."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/how-it-works.jpg",
						alt: "Four illustrated steps of the tutoring journey",
						className: "w-full rounded-[28px] object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "h-full p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-primary",
									children: step.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-lg",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: step.body
								})
							]
						})
					}, step.n))
				})
			]
		})
	});
}
function Subjects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "subjects",
		className: "bg-muted px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "Subjects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Four paths, Grades 1–7."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/subjects-icons.jpg",
						alt: "Illustrated icons for mathematics, English, science, and creative arts",
						className: "w-full rounded-[28px] object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: subjects.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 60,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "wiggle-hover flex h-full gap-4 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: s.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs font-semibold uppercase tracking-wide text-primary",
									children: s.grades
								})
							] })]
						})
					}, s.name))
				})
			]
		})
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "The hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mx-auto mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Soft colours, clear learning paths, no noise."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 50,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "h-full p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-primary",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-lg",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: s.body
							})
						]
					})
				}, s.n))
			})]
		})
	});
}
function Fun() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "fun",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-peach",
					children: "Fun learning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "An adventure, not a pile of worksheets."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: "Stars, games, puzzles, and a weekly challenge live inside the hub — always optional, always kind, never a loud leaderboard."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: Star,
						title: "Star trail",
						body: "Lessons and quizzes add up to a week you can actually see."
					},
					{
						icon: Gamepad2,
						title: "Practice games",
						body: "Short rounds for fractions, tables, and science."
					},
					{
						icon: Puzzle,
						title: "Puzzles",
						body: "Story questions and colour labs that stretch thinking."
					},
					{
						icon: Trophy,
						title: "Weekly challenge",
						body: "One extra quest for Scholar families, posted in the lounge."
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-muted p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-base",
							children: b.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: b.body
						})
					]
				}, b.title))
			})]
		})
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "About"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Built around a teacher, not a marketing script."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Patience Gwanyanya leads the tutoring with clarity, consistency, and approachable guidance for primary learners."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: [
						"Certified primary-school educator with classroom experience",
						"Methods designed for mobile-first families",
						"Progress tracking that keeps parents in the loop",
						"Personal feedback on every assignment"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }), p]
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "parent"
							},
							children: "Register as a parent"
						})
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-center gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-20 place-items-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground",
					children: "PG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Lead tutor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Patience Gwanyanya"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Founder · primary education"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1.5 text-sm text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }), " Families first"]
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-3",
				children: [
					{
						n: "1:1",
						l: "Tutoring"
					},
					{
						n: "1–7",
						l: "Grades"
					},
					{
						n: "4",
						l: "Subjects"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-muted p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: s.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: s.l
					})]
				}, s.l))
			})] })]
		})
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "bg-muted px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "Plans"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Simple monthly plans in rand."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 lg:grid-cols-3",
				children: plans.map((plan, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: cn("flex h-full flex-col p-6", plan.popular && "ring-2 ring-primary"),
						children: [
							plan.popular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground",
								children: "Most families"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-4xl",
								children: plan.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: plan.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 flex-1 space-y-2 text-sm",
								children: plan.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-primary" }), p]
								}, p))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-6 w-full",
								variant: plan.popular ? "default" : "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/login",
									search: {
										mode: "signup",
										role: "parent"
									},
									children: ["Choose ", plan.name]
								})
							})
						]
					})
				}, plan.name))
			})]
		})
	});
}
function Reviews() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "love",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: "Families"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-[clamp(1.6rem,3vw,2.3rem)]",
				children: "Kind words from the first tables."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "h-full p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 text-peach",
								children: Array.from({ length: 5 }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current" }, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm",
								children: [
									"“",
									r.quote,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold",
								children: r.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: r.role
							})
						]
					})
				}, r.name))
			})]
		})
	});
}
function Faq() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "FAQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-[clamp(1.6rem,3vw,2.3rem)]",
					children: "Questions parents usually ask."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-2",
				children: faqs.map((item, i) => {
					const on = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[22px] border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between gap-3 px-5 py-4 text-left",
							onClick: () => setOpen(on ? null : i),
							"aria-expanded": on,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base font-semibold",
								children: item.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-5 shrink-0 transition-transform", on && "rotate-180") })]
						}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-5 pb-5 text-sm text-muted-foreground",
							children: item.a
						}) : null]
					}, item.q);
				})
			})]
		})
	});
}
function Cta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl rounded-[32px] bg-primary px-6 py-12 text-primary-foreground sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-semibold text-primary-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), " Students and parents welcome"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-lg text-[clamp(1.6rem,3vw,2.3rem)] text-primary-foreground",
					children: "Get started today and start learning together."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "student"
							},
							children: "Register as student"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						asChild: true,
						className: "border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-bright",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "parent"
							},
							children: "Register as parent"
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 flex items-center gap-2 text-sm text-primary-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
					" Already have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: { mode: "signin" },
						className: "underline",
						children: "Sign in"
					})
				]
			})]
		}) })
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/mascot-owl.jpg",
							alt: "",
							className: "size-8 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: "PG Tutoring Hub"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-muted-foreground",
						children: "Primary-school tutoring with Patience Gwanyanya. Calm lessons, clear progress, and a friendly owl named Ollie."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#how",
							children: "How it works"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#subjects",
							children: "Subjects"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#pricing",
							children: "Plans"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#faq",
							children: "FAQ"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Get started"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "student"
							},
							children: "Student sign up"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "parent"
							},
							children: "Parent sign up"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { mode: "signin" },
							children: "Sign in"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 py-4 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Patience Gwanyanya · PG Tutoring Hub"
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Home as component };
