import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            Swal.fire({
                title: "Validation Error",
                text: "Please fill in all fields before submitting.",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            Swal.fire({
                title: "Message Sent!",
                text: "Thank you for contacting us. We will get back to you shortly.",
                icon: "success",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#10b981'
            });
        }, 1500);
    };

    return (
        <div className="w-full bg-[#0b0f19] text-white min-h-[calc(100vh-80px)]">
            
            {/* Header */}
            <div className="py-16 text-center border-b border-[#1f2937] bg-[#111827] relative overflow-hidden">
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[50%] h-[200%] bg-[#0ea5e9]/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact <span className="text-[#0ea5e9]">Us</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">Have a question about our products or need technical support? We're here to help.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* Contact Info (Left Column) */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-white border-b border-[#1f2937] pb-4">Get in Touch</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-[#1f2937] flex items-center justify-center text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors shrink-0">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-200">Our Address</h4>
                                        <p className="text-gray-400 text-sm mt-1">123 Tech Avenue, Silicon Valley<br/>Colombo 00300, Sri Lanka</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-[#1f2937] flex items-center justify-center text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors shrink-0">
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-200">Phone Number</h4>
                                        <p className="text-gray-400 text-sm mt-1">+94 112 345 678<br/>+94 777 123 456</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-[#1f2937] flex items-center justify-center text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors shrink-0">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-200">Email Address</h4>
                                        <p className="text-gray-400 text-sm mt-1">support@isurucomputers.com<br/>sales@isurucomputers.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-[#1f2937] flex items-center justify-center text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors shrink-0">
                                        <FaClock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-200">Business Hours</h4>
                                        <p className="text-gray-400 text-sm mt-1">Mon - Sat: 9:00 AM - 7:00 PM<br/>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-200 mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-400 hover:bg-[#0ea5e9] hover:text-white transition-all hover:-translate-y-1"><FaFacebookF /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-400 hover:bg-[#0ea5e9] hover:text-white transition-all hover:-translate-y-1"><FaTwitter /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-400 hover:bg-[#0ea5e9] hover:text-white transition-all hover:-translate-y-1"><FaInstagram /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-400 hover:bg-[#0ea5e9] hover:text-white transition-all hover:-translate-y-1"><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Middle Column) */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111827] rounded-2xl p-8 md:p-10 border border-[#1f2937] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/5 rounded-bl-full pointer-events-none"></div>
                            
                            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe" 
                                            className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com" 
                                            className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Subject *</label>
                                    <input 
                                        type="text" 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?" 
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                                    <textarea 
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..." 
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500 resize-none custom-scrollbar"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full md:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="w-full h-[400px] border-t border-[#1f2937]">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58638743129!2d79.77380313175317!3d6.9218335277864115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ISURU COMPUTERS Location"
                ></iframe>
            </div>

        </div>
    );
}
