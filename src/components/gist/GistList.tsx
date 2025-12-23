"use client";

import { GIST_CATEGORIES, GistCategory, GistLink, GistSubCategory } from "@/lib/gist";
import { GIST_CONTRIBUTORS } from "@/lib/gist-contributor";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Return from "../ui/Return";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ContributorsList() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground/60">contributors</span>
      <div className="flex items-center -space-x-2">
        {GIST_CONTRIBUTORS.map((contributor, index) => (
          <Link
            key={contributor.name}
            href={contributor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            style={{ zIndex: GIST_CONTRIBUTORS.length - index }}
          >
            <motion.div
              whileHover={{ scale: 1.15, zIndex: 50 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-background bg-card">
                <Image
                  src={contributor.avatar}
                  alt={contributor.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="
                  absolute -bottom-8 left-1/2 -translate-x-1/2
                  px-2 py-1 rounded-md
                  bg-card border border-border
                  text-xs text-foreground whitespace-nowrap
                  opacity-0 group-hover:opacity-100
                  scale-90 group-hover:scale-100
                  pointer-events-none
                  transition-all duration-200
                  z-50
                "
              >
                {contributor.name}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LinkCard({ link }: { link: GistLink }) {
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="
          flex items-start justify-between gap-4
          p-4 rounded-lg
          bg-card/40 border border-border/50
          hover:bg-card/60 hover:border-border
          transition-all duration-300
        "
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {link.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {link.description}
          </p>
        </div>
        <ArrowUpRight
          className="
            w-4 h-4 shrink-0 mt-0.5
            text-muted-foreground/50
            group-hover:text-primary
            group-hover:-translate-y-0.5 group-hover:translate-x-0.5
            transition-all duration-300
          "
        />
      </motion.div>
    </Link>
  );
}

function SubCategoryItem({ subcategory }: { subcategory: GistSubCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-4 py-3
          bg-card/30 hover:bg-card/50
          transition-colors duration-200
          cursor-pointer
        "
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-foreground capitalize">
            {subcategory.title}
          </span>
          <span className="text-xs text-muted-foreground/60">
            ({subcategory.links.length})
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 grid gap-3">
              {subcategory.links.map((link) => (
                <LinkCard key={link.url} link={link} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DirectCategory({ category }: { category: GistCategory }) {
  return (
    <motion.section variants={itemVariants} className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {category.title}
      </h2>
      <div className="grid gap-3">
        {category.links?.map((link) => (
          <LinkCard key={link.url} link={link} />
        ))}
      </div>
    </motion.section>
  );
}

function SubcategoriesCategory({ category }: { category: GistCategory }) {
  return (
    <motion.section variants={itemVariants} className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {category.title}
      </h2>
      <div className="grid gap-3">
        {category.subcategories?.map((subcategory) => (
          <SubCategoryItem key={subcategory.slug} subcategory={subcategory} />
        ))}
      </div>
    </motion.section>
  );
}

export function GistList() {
  return (
    <div className="layout-container">
      <Return className="mb-8" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 space-y-4"
      >
        <div>
          <h1 className="text-2xl font-medium text-foreground tracking-tight mb-2">
            gist
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            a curated collection of useful links, tools, and resources i keep
            coming back to. hope you find something helpful.
          </p>
        </div>
        <ContributorsList />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {GIST_CATEGORIES.map((category) =>
          category.type === "direct" ? (
            <DirectCategory key={category.slug} category={category} />
          ) : (
            <SubcategoriesCategory key={category.slug} category={category} />
          )
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 pt-6 border-t border-border/40"
      >
        <p className="text-xs text-muted-foreground/60 text-center">
          got a cool link to share?{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline underline-offset-2"
          >
            let me know
          </Link>
        </p>
      </motion.div>
    </div>
  );
}