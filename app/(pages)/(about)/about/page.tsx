export default function AboutPage() {
  return (
    <div className="max-w-3xl pt-8">
        
        <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-8 leading-[1.1]">
            Code that protects itself. <br />
            <span className="text-neutral-500">Automated governance for developers.</span>
        </h1>
        
        <div className="space-y-8 text-lg text-neutral-400 font-light leading-relaxed">
            <p>
                Jiramo began with a harsh truth known to every agency: 
                <span className="text-white"> managing recurring revenue is a distraction.</span> Manual renewal tracking and payment chasing drain the creative flow.
            </p>
            <p>
                We built the solution. An open-source ecosystem that connects your code to your business logic. 
                It’s not just a CRM; it’s an enforcement layer for your intellectual property.
            </p>
        </div>

        <div className="mt-20 mb-20">
            <h3 className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-8"> The Mechanism </h3>
            
            <div className="grid grid-cols-1 gap-12 border-l border-white/10 pl-8">
                
                <FeatureBlock 
                    title="Remote Enforcement" 
                    description="Your deployed software queries our API periodically. If a subscription lapses, the system automatically degrades features or restricts access. No manual intervention required."
                />

                <FeatureBlock 
                    title="Code-Level Integration" 
                    description="Native SDKs allow you to bind application logic (analytics, auth, data) directly to invoice status. You control the granularity of the lock."
                />

                <FeatureBlock 
                    title="Client Autonomy" 
                    description="A dedicated portal allows clients to handle payments and view project data transparently. We remove the friction between delivery and compensation."
                />

            </div>
        </div>

        
    </div>
  );
}

function FeatureBlock({ title, description }: { title: string, description: string }) {
    return (
        <div>
            <h4 className="text-xl text-white font-medium mb-3 transition-colors duration-300">
                {title}
            </h4>
            <p className="text-neutral-500 text-sm leading-6 max-w-lg">
                {description}
            </p>
        </div>
    )
}