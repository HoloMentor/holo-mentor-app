import React from 'react';

export default function StudyPlan() {
    return (
        <section className="h-screen mb-20">
            <div className="flex p-4 mr-4 bg-white rounded-md shadow-md">
                <p className="ml-3 text-3xl font-bold text-dark-green">Study Plan</p>
            </div>
            <section className="flex flex-col h-full mt-4">
                <div className="grid grid-cols-5 gap-1 mr-4 rounded-md shadow-md">
                    <button className="p-4 bg-white shadow-lg">Tier 1</button>
                    <button className="p-4 shadow-lg">Tier 2</button>
                    <button className="p-4 shadow-lg">Tier 3</button>
                    <button className="p-4 shadow-lg">Tier 4</button>
                    <button className="p-4 shadow-lg">Tier 5</button>
                </div>
                <div className="flex-1 mr-4 bg-white">
                    <div id="tier1" className="p-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis cupiditate
                        inventore maxime harum officiis aut eligendi tenetur quas odit totam dolor
                        rem unde magni, nulla iure ducimus debitis quis assumenda.
                    </div>
                    <div id="tier1" className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, inventore?
                        Dolorum voluptatem beatae debitis eius numquam nihil esse odit quisquam sed
                        incidunt fugit, inventore cupiditate dignissimos aperiam porro cum commodi.
                    </div>
                    <div id="tier1" className="p-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, aliquam.
                        Dolorem, voluptatem doloremque vitae sit quas praesentium quos asperiores
                        in. Natus minus tempora at explicabo autem repellat obcaecati, totam esse?
                    </div>
                </div>
            </section>
        </section>
    );
}
