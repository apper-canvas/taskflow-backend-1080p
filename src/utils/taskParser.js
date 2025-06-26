export const parseTaskInput = (input) => {
  let title = input.trim()
  let dueDate = null
  let priority = 4

  // Parse priority (p1, p2, p3, p4)
  const priorityMatch = title.match(/\bp([1-4])\b/i)
  if (priorityMatch) {
    priority = parseInt(priorityMatch[1])
    title = title.replace(/\bp[1-4]\b/i, '').trim()
  }

  // Parse dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  // Check for common date phrases
  if (/\btoday\b/i.test(title)) {
    dueDate = today.toISOString()
    title = title.replace(/\btoday\b/i, '').trim()
  } else if (/\btomorrow\b/i.test(title)) {
    dueDate = tomorrow.toISOString()
    title = title.replace(/\btomorrow\b/i, '').trim()
  } else if (/\bnext week\b/i.test(title)) {
    dueDate = nextWeek.toISOString()
    title = title.replace(/\bnext week\b/i, '').trim()
  }

  // Clean up extra whitespace
  title = title.replace(/\s+/g, ' ').trim()

  return {
    title,
    dueDate,
    priority
  }
}