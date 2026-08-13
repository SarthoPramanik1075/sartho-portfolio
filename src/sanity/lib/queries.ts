import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/react'
import { groq } from 'next-sanity'

import { sanityFetch } from './live'

export type SanityImageValue = SanityImageSource & { asset?: { _ref: string } }

export interface SkillRef {
  _id?: string
  name: string
  icon?: SanityImageValue
  category?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface PersonaHighlight {
  audience: string
  blurb: string
}

export interface About {
  headline: string
  bio?: PortableTextBlock[]
  shortBio?: string
  profilePhoto?: SanityImageValue
  resumeFile?: { asset?: { url: string } }
  personaHighlights?: PersonaHighlight[]
  socialLinks?: SocialLink[]
  location?: string
  availabilityStatus?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteSettings {
  siteTitle: string
  defaultSeoDescription?: string
  defaultOgImage?: SanityImageValue
  favicon?: SanityImageValue
  contactEmail?: string
  navLinks?: NavLink[]
  footerText?: string
  googleSiteVerification?: string
}

export interface ProjectLinks {
  live?: string
  repo?: string
  demo?: string
  press?: string
}

export interface ProjectCard {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  coverImage?: SanityImageValue
  category: string[]
  status?: string
  techStack?: SkillRef[]
  links?: ProjectLinks
  startDate?: string
  endDate?: string
  featured?: boolean
}

export interface ProjectDetail extends ProjectCard {
  description?: PortableTextBlock[]
  gallery?: SanityImageValue[]
  role?: string
  outcomes?: string[]
  relatedExperience?: { organization: string; role: string }
  relatedResearch?: { title: string; slug: { current: string } }
}

export interface Experience {
  _id: string
  organization: string
  role: string
  logo?: SanityImageValue
  location?: string
  employmentType?: string
  startDate: string
  endDate?: string
  summary?: PortableTextBlock[]
  highlights?: string[]
  skillsUsed?: SkillRef[]
}

export interface Research {
  _id: string
  title: string
  slug: { current: string }
  abstract?: string
  publicationVenue?: string
  status: string
  authors?: string[]
  date?: string
  researchInterests?: string[]
}

export interface ResearchDetail extends Research {
  doiOrLink?: string
  pdf?: { asset?: { url: string } }
  relatedProject?: { title: string; slug: { current: string } }
}

export interface Achievement {
  _id: string
  title: string
  issuer: string
  date: string
  placement?: string
  description?: string
  eventUrl?: string
  teamSize?: number
}

export interface Certification {
  _id: string
  title: string
  issuingOrganization: string
  logo?: SanityImageValue
  issueDate?: string
  expiryDate?: string
  credentialUrl?: string
}

export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  authorRole?: string
  authorOrg?: string
  authorPhoto?: SanityImageValue
  linkedInUrl?: string
}

const PROJECT_CARD_FIELDS = groq`
  _id, title, slug, summary, coverImage, category, status,
  techStack[]->{name, icon},
  links, startDate, endDate, featured
`

export const ABOUT_QUERY = groq`*[_type == "about"][0]{
  headline, bio, shortBio, profilePhoto,
  resumeFile{asset->{url}},
  personaHighlights[]{audience, blurb},
  socialLinks[]{platform, url},
  location, availabilityStatus
}`

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  siteTitle, defaultSeoDescription, defaultOgImage, favicon, contactEmail,
  navLinks[]{label, href}, footerText, googleSiteVerification
}`

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc, startDate desc){
    ${PROJECT_CARD_FIELDS}
  }
`

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, startDate desc){
    ${PROJECT_CARD_FIELDS}
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${PROJECT_CARD_FIELDS},
    description, gallery, role, outcomes,
    relatedExperience->{organization, role},
    relatedResearch->{title, slug}
  }
`

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(slug.current)].slug.current`

export const EXPERIENCE_LIST_QUERY = groq`
  *[_type == "experience"] | order(startDate desc){
    _id, organization, role, logo, location, employmentType,
    startDate, endDate, summary, highlights,
    skillsUsed[]->{name}
  }
`

export const RESEARCH_LIST_QUERY = groq`
  *[_type == "research"] | order(date desc){
    _id, title, slug, abstract, publicationVenue, status, authors, date, researchInterests
  }
`

export const RESEARCH_BY_SLUG_QUERY = groq`
  *[_type == "research" && slug.current == $slug][0]{
    _id, title, slug, abstract, publicationVenue, status, authors, date, researchInterests,
    doiOrLink, pdf{asset->{url}},
    relatedProject->{title, slug}
  }
`

export const RESEARCH_SLUGS_QUERY = groq`*[_type == "research" && defined(slug.current)].slug.current`

export const ACHIEVEMENTS_QUERY = groq`
  *[_type == "achievement"] | order(date desc){
    _id, title, issuer, date, placement, description, eventUrl, teamSize
  }
`

export const CERTIFICATIONS_QUERY = groq`
  *[_type == "certification"] | order(issueDate desc){
    _id, title, issuingOrganization, logo, issueDate, expiryDate, credentialUrl
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc){
    _id, quote, authorName, authorRole, authorOrg, authorPhoto, linkedInUrl
  }
`

export const SKILLS_QUERY = groq`
  *[_type == "skill"] | order(category asc, name asc){
    _id, name, category, icon
  }
`

export async function getAbout() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY })
  return data as About | null
}

export async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY })
  return data as SiteSettings | null
}

export async function getFeaturedProjects() {
  const { data } = await sanityFetch({ query: FEATURED_PROJECTS_QUERY })
  return data as ProjectCard[]
}

export async function getAllProjects() {
  const { data } = await sanityFetch({ query: ALL_PROJECTS_QUERY })
  return data as ProjectCard[]
}

export async function getProjectBySlug(slug: string) {
  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })
  return data as ProjectDetail | null
}

export async function getProjectSlugs() {
  const { data } = await sanityFetch({ query: PROJECT_SLUGS_QUERY })
  return data as string[]
}

export async function getExperienceList() {
  const { data } = await sanityFetch({ query: EXPERIENCE_LIST_QUERY })
  return data as Experience[]
}

export async function getResearchList() {
  const { data } = await sanityFetch({ query: RESEARCH_LIST_QUERY })
  return data as Research[]
}

export async function getResearchBySlug(slug: string) {
  const { data } = await sanityFetch({ query: RESEARCH_BY_SLUG_QUERY, params: { slug } })
  return data as ResearchDetail | null
}

export async function getResearchSlugs() {
  const { data } = await sanityFetch({ query: RESEARCH_SLUGS_QUERY })
  return data as string[]
}

export async function getAchievements() {
  const { data } = await sanityFetch({ query: ACHIEVEMENTS_QUERY })
  return data as Achievement[]
}

export async function getCertifications() {
  const { data } = await sanityFetch({ query: CERTIFICATIONS_QUERY })
  return data as Certification[]
}

export async function getTestimonials() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY })
  return data as Testimonial[]
}

export async function getAllSkills() {
  const { data } = await sanityFetch({ query: SKILLS_QUERY })
  return data as SkillRef[]
}
