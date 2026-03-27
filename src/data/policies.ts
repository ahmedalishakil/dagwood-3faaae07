export interface PolicySection {
  title: string;
  content: string;
}

export interface Policy {
  id: string;
  title: string;
  effectiveDate: string;
  version: string;
  sections: PolicySection[];
}

export const policies: Policy[] = [
  {
    id: "terms",
    title: "Terms & Conditions",
    effectiveDate: "March 2026",
    version: "1.0",
    sections: [
      {
        title: "1. About Dagwood",
        content: `These Terms & Conditions govern your use of Dagwood's ordering services, including our website (dagwood.com.pk), mobile app, WhatsApp ordering platform, and in-store ordering. By placing an order through any channel, you agree to these terms.\n\nBusiness Name: Dagwood\nPIA Branch: 10-D PIA Road, Lahore, Pakistan\nVertical 94 Branch: 94 Pine Ave, Block B, Khayaban-e-Amin, Lahore, Pakistan\nPhone: 042111222224\nEmail: info@dagwood.com.pk`,
      },
      {
        title: "2. Ordering & Contract",
        content: `• An order is confirmed only after you receive a confirmation message via WhatsApp, app notification, or on-screen confirmation.\n• Dagwood reserves the right to cancel or refuse any order due to item unavailability, pricing errors, or suspected fraudulent activity.\n• In the event of a cancellation initiated by Dagwood, a full refund will be issued via the original payment method.\n• Orders placed through walk-in, website, WhatsApp, or mobile app are subject to the same terms.`,
      },
      {
        title: "3. Pricing",
        content: `• All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes.\n• Dagwood reserves the right to update menu prices at any time without prior notice.\n• Delivery charges are fixed at Rs.100 for all delivery orders regardless of order size or distance within Lahore.\n• No hidden fees are applied at checkout beyond the stated delivery charge.`,
      },
      {
        title: "4. Payment",
        content: `• Accepted payment methods: Cash on Delivery (COD), JazzCash, Easypaisa, and Card (Visa/Mastercard).\n• Card payments are processed through a PCI-DSS compliant payment gateway. Dagwood does not store card details.\n• Digital wallet payments are subject to the terms of the respective wallet provider (JazzCash / Easypaisa).\n• In case of a payment failure, the order will not be confirmed. Please retry or use an alternative payment method.`,
      },
      {
        title: "5. Cancellation & Refunds",
        content: `• Orders may be cancelled within 2 minutes of placement, before kitchen preparation begins.\n• Once preparation has started, cancellation is not possible. Store credit may be offered at Dagwood's discretion.\n• Refunds for valid claims are processed within 3–7 business days depending on the payment method.\n\nFull details are set out in our Return & Refund Policy available at dagwood.com.pk.`,
      },
      {
        title: "6. Delivery",
        content: `• Delivery is available 24/7 across Lahore from both branches.\n• Estimated delivery time: 20–45 minutes for standard orders; within 90 minutes for bulk orders.\n• Delivery ETAs are estimates and may vary due to demand, traffic, or weather conditions.\n• Dagwood is not liable for delays caused by incorrect or incomplete delivery addresses provided by the customer.\n• Minimum order value for delivery: Rs.300.`,
      },
      {
        title: "7. Food & Allergens",
        content: `• All Dagwood products are 100% halal, sourced from certified halal suppliers.\n• Our products contain gluten (bread) and dairy (sauces/cheese) and may contain traces of nuts, eggs, soy, and sesame due to shared kitchen equipment.\n• Dagwood cannot guarantee any product is free from allergen traces. Customers with severe allergies should contact us directly before ordering.\n• Dagwood does not make any medical or health claims about its products.`,
      },
      {
        title: "8. User Responsibilities",
        content: `• You must provide accurate delivery information including address and contact number.\n• You are responsible for ensuring someone is available to receive the delivery at the provided address.\n• You must be of legal age and have the authority to enter into a binding transaction.\n• Misuse, abuse, or fraudulent use of the ordering platform may result in suspension of access.`,
      },
      {
        title: "9. Intellectual Property",
        content: `All content on dagwood.com.pk and the Dagwood mobile app — including the brand name, logo, menu design, and photography — is the property of Dagwood and may not be reproduced, distributed, or used without prior written consent.`,
      },
      {
        title: "10. Limitation of Liability",
        content: `• Dagwood's liability in relation to any order is limited to the value of that order.\n• Dagwood is not liable for indirect or consequential losses arising from delayed or failed delivery.\n• Dagwood is not responsible for third-party platform outages (WhatsApp, JazzCash, Easypaisa, payment gateway).`,
      },
      {
        title: "11. Governing Law",
        content: `These Terms & Conditions are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.`,
      },
      {
        title: "12. Updates to These Terms",
        content: `Dagwood reserves the right to update these Terms & Conditions at any time. The current version will always be published at dagwood.com.pk. Continued use of our services after any update constitutes your acceptance of the revised terms.`,
      },
      {
        title: "13. Contact",
        content: `Phone: 042111222224\nEmail: info@dagwood.com.pk\nWebsite: dagwood.com.pk\nInstagram: @dagwoodpk`,
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    effectiveDate: "March 2026",
    version: "1.1",
    sections: [
      {
        title: "1. Who We Are",
        content: `Dagwood is a food & beverage brand operating in Lahore, Pakistan. We offer dine-in, takeaway, and delivery services across multiple ordering channels including walk-in, website, WhatsApp, and our mobile app.\n\nContact: info@dagwood.com.pk | 042111222224\nWebsite: dagwood.com.pk`,
      },
      {
        title: "2. Ordering Channels & Data Collection",
        content: `Dagwood collects personal data through the following channels:\n\n• Walk-in — Name (if provided), order details (Lawful Basis: Contract performance)\n• Website — Name, phone, address, order details, payment method, session data (Lawful Basis: Contract performance)\n• WhatsApp — Name, phone number, location pin, order history, chat interactions (Lawful Basis: Contract performance / Legitimate interest)\n• Mobile App — Name, phone, address, order history, device ID, location if permitted (Lawful Basis: Contract performance / Consent)`,
      },
      {
        title: "3. How We Use Your Information",
        content: `• To process and fulfil your order across all channels\n• To confirm delivery and send order updates via WhatsApp or app notification\n• To respond to customer support and complaint queries\n• To improve our menu, service, and ordering experience\n• To send promotional messages — only with your explicit consent\n• To comply with legal and regulatory obligations`,
      },
      {
        title: "4. Payment Data",
        content: `Card payments are processed securely through a PCI-DSS compliant payment gateway. Dagwood does not store, log, or have access to your full card number, CVV, or banking credentials. Payment data is handled entirely by the payment processor. Digital wallet payments (JazzCash, Easypaisa) are processed directly by those platforms under their respective privacy policies.`,
      },
      {
        title: "5. Data Sharing",
        content: `We do not sell or rent your personal data. We may share limited data with:\n\n• Delivery riders — name and address only, for order fulfilment\n• Payment processors — for secure transaction processing\n• Technology partners — website hosting, mobile app infrastructure, WhatsApp Business API (Meta/Loop X)\n• Regulatory or law enforcement authorities — only where legally required\n\nAll third parties are bound by confidentiality obligations and may not use your data for any other purpose.`,
      },
      {
        title: "6. International Data Transfers",
        content: `Certain technology partners (including Meta/WhatsApp and cloud infrastructure providers) may process or store data outside Pakistan. Where this occurs, we ensure appropriate safeguards are in place through contractual protections with those providers.`,
      },
      {
        title: "7. Data Retention",
        content: `We retain customer data for as long as necessary to provide our services and meet legal obligations. Order records are typically retained for 12 months. You may request deletion of your data at any time by contacting us.`,
      },
      {
        title: "8. Your Rights",
        content: `You have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate or incomplete data\n• Request deletion of your data (right to erasure)\n• Request restriction of processing in certain circumstances\n• Request a portable copy of your data\n• Object to processing based on legitimate interest\n• Withdraw consent at any time where processing is based on consent\n• Lodge a complaint with a relevant data protection authority\n\nTo exercise any of these rights, contact us at info@dagwood.com.pk or 042111222224.`,
      },
      {
        title: "9. Automated Decision-Making",
        content: `Dagwood does not use automated decision-making or profiling that produces legal or significant effects on customers. Our AI chatbot (WhatsApp) assists with order guidance only and does not make decisions about individuals.`,
      },
      {
        title: "10. Cookies & Tracking",
        content: `Our website and app may use session cookies strictly for functionality and order flow. We do not use third-party advertising trackers or behavioural profiling cookies. You may disable cookies in your browser settings, though this may affect ordering functionality.`,
      },
      {
        title: "11. Security",
        content: `We apply industry-standard security measures including 256-bit SSL encryption for all payment and data transmissions. Access to customer data is restricted to authorised personnel only. While we take all reasonable precautions, no digital transmission can be guaranteed as completely secure.`,
      },
      {
        title: "12. Policy Updates",
        content: `This policy may be updated periodically to reflect changes in our services or applicable regulations. The latest version will always be available at dagwood.com.pk. Continued use of our services constitutes acceptance of the current policy.`,
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    effectiveDate: "March 2026",
    version: "1.0",
    sections: [
      {
        title: "1. Business Information",
        content: `Business Name: Dagwood\nPIA Branch: 10-D PIA Road, Lahore, Pakistan\nVertical 94 Branch: 94 Pine Ave, Block B, Khayaban-e-Amin, Lahore, Pakistan\nPhone: 042111222224\nEmail: info@dagwood.com.pk\nWebsite: dagwood.com.pk`,
      },
      {
        title: "2. Ordering Channels",
        content: `Orders can be placed through the following channels:\n\n• Walk-in — dine-in or takeaway at either branch\n• Website — dagwood.com.pk\n• WhatsApp — via our automated ordering chatbot\n• Mobile App — Dagwood iOS & Android app`,
      },
      {
        title: "3. Delivery Coverage",
        content: `Dagwood delivers across Lahore. Delivery is available 24 hours a day, 7 days a week, from both branches. Customers are required to drop a delivery pin at checkout to confirm the delivery address.`,
      },
      {
        title: "4. Delivery Charges",
        content: `• Standard Order — Rs.100 (fixed), 20–45 minutes\n• Bulk Order — Rs.100 (fixed), within 90 minutes\n• Takeaway / Dine-in — No delivery charge, ready in-store\n\nMinimum order value for delivery: Rs.300. No minimum for pickup or dine-in.`,
      },
      {
        title: "5. Payment Methods",
        content: `• Cash on Delivery (COD)\n• JazzCash\n• Easypaisa\n• Card (Visa / Mastercard)`,
      },
      {
        title: "6. Order Tracking",
        content: `Order status updates are sent via WhatsApp. Customers can track their active order using the Track Order button within the ordering interface. For further assistance, contact us at 042111222224 or info@dagwood.com.pk.`,
      },
      {
        title: "7. Failed or Delayed Delivery",
        content: `If a delivery fails to arrive within the stated ETA window, customers may contact our support team for a status update. In the event of a confirmed failed delivery, Dagwood will offer a re-dispatch or full refund in accordance with our Return & Refund Policy.`,
      },
      {
        title: "8. Branch Operating Hours",
        content: `• Vertical 94 (Pine Avenue) — Dine-in & Takeaway: 8 AM to 4 AM daily\n• PIA Branch — Confirm with management (available on dagwood.com.pk)\n• Delivery: 24/7 from both branches`,
      },
    ],
  },
  {
    id: "returns",
    title: "Return & Refund Policy",
    effectiveDate: "March 2026",
    version: "1.0",
    sections: [
      {
        title: "1. Business Overview",
        content: `Dagwood is a sandwich and café brand based in Lahore, Pakistan, operating dine-in, takeaway, and delivery services. Orders are placed digitally through the Dagwood website, Mobile app, WhatsApp, and walk-in and fulfilled from our physical branches.\n\nBusiness Name: Dagwood\nBusiness Type: Food & Beverage — Dine-in, Takeaway, Delivery\nLocation: Lahore, Pakistan\nContact: info@dagwood.com.pk | 042111222224\nWebsite: dagwood.com.pk`,
      },
      {
        title: "2. Policy Overview",
        content: `As a freshly prepared food brand, Dagwood does not accept physical returns of food items once they have been dispatched or served. However, customers are entitled to a full refund or replacement in the event of a verified service failure, incorrect order fulfilment, or product quality issue. This policy applies to all orders placed via the Dagwood digital ordering platform, including orders paid by card, JazzCash, Easypaisa, or Cash on Delivery.`,
      },
      {
        title: "3. Order Cancellation",
        content: `3.1 Cancellation Window\nCustomers may cancel their order within 2 minutes of order placement, provided the kitchen has not yet begun preparation.\n\n3.2 After Preparation Has Begun\nOnce kitchen preparation has started, orders cannot be cancelled. In this case, Dagwood may offer store credit at its discretion. Customers who dispute this may be escalated to a senior team member.`,
      },
      {
        title: "4. Eligible Refund Scenarios",
        content: `A refund or replacement will be issued in the following verified situations:\n\n• Wrong item delivered — Full replacement or full refund\n• Missing item(s) from order — Replacement of missing item or partial refund\n• Visibly damaged or spoiled food upon delivery — Full replacement or full refund\n• Order never arrived / confirmed lost — Full refund or re-dispatch\n• Duplicate charge or payment processing error — Full refund of duplicate amount`,
      },
      {
        title: "5. Non-Eligible Refund Scenarios",
        content: `Refunds will not be issued in the following cases:\n\n• Customer ordered the wrong item and the order was fulfilled correctly\n• Customer changed their mind after kitchen preparation began\n• Dissatisfaction based on taste preference where the item was delivered as described\n• Delivery completed within the stated ETA window (20–90 minutes depending on order type)\n• Incorrect bread or customisation choice made by the customer during checkout`,
      },
      {
        title: "6. Refund Process & Timelines",
        content: `All refund requests must be raised through the Dagwood customer support channel within 24 hours of the order being received.\n\n• Cash on Delivery (COD) — No charge, no refund required\n• JazzCash — 3–5 business days, reversed to original account\n• Easypaisa — 3–5 business days, reversed to original account\n• Card (Visa / Mastercard) — 5–7 business days, reversed to original card`,
      },
      {
        title: "7. Chargeback & Dispute Policy",
        content: `In the event of a chargeback raised through a payment gateway or card network, Dagwood will provide the following documentation as evidence:\n\n• Order confirmation and timestamp\n• Delivery confirmation from the rider\n• Customer communication history\n• Photographic evidence where available\n\nDagwood is committed to resolving all genuine customer disputes promptly and in good faith. Fraudulent chargebacks will be disputed with the relevant documentation.`,
      },
      {
        title: "8. Delivery & Service Guarantee",
        content: `• Standard orders: delivered within 20–45 minutes\n• Bulk orders: delivered within 90 minutes across Lahore\n• Delivery fee: Rs.100 fixed for all orders\n• Minimum order value for delivery: Rs.300\n\nIn the event of a failed or significantly delayed delivery outside of the stated ETA window, customers are eligible for a refund or re-dispatch at Dagwood's discretion.`,
      },
      {
        title: "9. Contact for Refund & Dispute Resolution",
        content: `• Phone / WhatsApp: 042111222224\n• Email: info@dagwood.com.pk\n• Branch — PIA Road: 9-D PIA Road, Main Boulevard, near Wapda Town, Lahore\n• Branch — Vertical 94: 94 Pine Ave, Block B, Khayaban-e-Amin, Lahore\n• Instagram: @dagwoodpk\n• Facebook: facebook.com/dagwoodpk`,
      },
      {
        title: "10. Policy Updates",
        content: `This policy is reviewed periodically and may be updated to reflect changes in operations or regulatory requirements. The current version will always be available at dagwood.com.pk. Continued use of Dagwood ordering services constitutes acceptance of the prevailing policy.`,
      },
    ],
  },
];
