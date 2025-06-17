const classifyLead = (metadata, config) => {
    const urgency = metadata.urgency?.toLowerCase() || "";
    const budget = parseInt(metadata.budget?.replace(/\D/g, "") || "0");
    const invalidFlags = config.classification_rules.Invalid.invalid_keywords;
  
    for (const word of invalidFlags) {
      if (urgency.includes(word)) return "Invalid";
    }
  
    if (
      budget >= config.classification_rules.Hot.budget_min &&
      config.classification_rules.Hot.urgency.some(u => urgency.includes(u))
    ) {
      return "Hot";
    }
  
    if (config.classification_rules.Cold.urgency.some(u => urgency.includes(u))) {
      return "Cold";
    }
  
    return "Cold";
  };
  
  export default classifyLead;
  