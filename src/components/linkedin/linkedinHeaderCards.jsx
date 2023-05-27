import React from 'react';
import 'primeicons/primeicons.css';


const LinkedinHeaderCards = () => {
    return (
        <div className="grid">
            {/*1*/}
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Send Today</span>
                            <div className="text-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-send text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            {/*2*/}
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Opened Today</span>
                            <div className="text-900 font-medium text-xl">23</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            {/*3*/}
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Responded Today</span>
                            <div className="text-900 font-medium text-xl">4</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520  </span>
                    <span className="text-500">newly registered</span>
                </div>
            </div>
            {/*4*/}
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Bounced Today</span>
                            <div className="text-900 font-medium text-xl">2</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-times-circle text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span>
                </div>
            </div>
        </div>
    );
};

export default LinkedinHeaderCards;
