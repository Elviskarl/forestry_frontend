import { useContext } from "react";
import * as turf from "@turf/turf";
import { ShapefileContext } from "../../../context/createShapefileContext";

function Main() {
  const { target_counties, mau_forest } = useContext(ShapefileContext)!;
  if (!target_counties || !mau_forest) return;
  console.log(target_counties);
  return (
    <main>
      <section className="introduction">
        <h1 className="introduction-heading">Mau Forest</h1>
        <h3>Introduction</h3>
        <p className="text">
          The mau forest complex is the largest closed-canopy montane tropical
          forest in East africa. Straddling {target_counties.features.length}{" "}
          counties covering approximately ~{" "}
          {(turf.area(mau_forest) / 10000).toLocaleString()} ha, it serves as a
          catchment for rivers west of the Great Rift Valley.
        </p>
        <p className="text">
          It comprises of 22 forest blocks, 21 of which are managed by the Kenya
          forest service with the Maasai trust land forest being an exception
          which is managed by the Narok county government. Of these are 16
          contiguous forests and 6 separate satellite forests.
        </p>
        <p className="text">
          But this was not always the case. The forest has witnessed a long,
          protracted and contentious history of human habitation. A key theme
          that emerges in this analysis is the question of who creates and
          controls forest data in particular, maps.
        </p>
      </section>
      <section className="background">
        <h3>Historical background</h3>
        <p className="text">
          To understand the forest as it exists today, it important to
          understand the conditions that shaped it in the past.
        </p>
        <p className="text">
          The establishment of British colonial rule in Kenya was accompanied by
          designation of much of the country as crown land. Large areas of
          fertile land in the rift valley were incorporated into the "White
          highlands" and allocated to European settlers. Indigenous communities
          were relocated to ethnically defined reserves , while many others
          remained on settler farms as squatters, providing labour in exchange
          for the right to cultivate land. At the same time, large tracts of
          forest were gazetted as forest reserves resulting in the displacement
          of communities in the name of conservation and the public interest.
          Together, these policies resulted in widespread land dispossession and
          inequality, fueling tensions that intensified after the second world
          war. This culminated in an armed anti-colonial movement under the name
          of Land and Freedom Army, which came to be known among the settler
          community as the Mau Mau.
        </p>
        <p className="text">
          With the approach of independence, the British government and the
          colonial administration introduced a land market for settlers who
          wanted to sell their farms. The Kenyan Government, using loans
          provided by the British Government and world bank, bought most of
          them. The story of land distribution under settlement schemes, is
          largely the story of what happened to these lands.
        </p>
        <p className="text">
          Following independence, the post colonial state continued to play a
          central role in controlling access to forest land, often using it to
          reinforce political patronage. During the Moi administration, many
          settlers who had occupied parts of the mau forest under the reign of
          his predecessor were evicted and re-occupied by communities aligned to
          him. Large areas of the Mau forest complex and other forest reserves
          were excised and converted into settlement schemes. While these
          schemes were presented as mechanisms for land distribution, they would
          also serve to legitimize settlement in the reserves and turn it into a
          cover for massive and irregular appropriations.
        </p>
        <p className="text">
          Owing to the numerous irregularities surrounding the Mau settlement
          schemes, the Government has placed caveats in many of the affected
          areas from 2002 onwards. As a result tens of thousands of residents
          have remained in a state of legal uncertainty, with unresolved
          questions over land ownership and tenure continuing to shape debates
          on conservation and settlement within the forest complex.
        </p>
      </section>
      <section className="new-era">
        <h3>
          21<sup>st</sup> century
        </h3>
        <p className="text">
          With the dawn of the twenty-first century, advances in remote sensing
          provided a new perspective from which to observe the Earth. Satellite
          imagery made it possible to monitor landscapes over time, offering a
          consistent and objective record of changes occurring on the earth's
          surface.
        </p>
        <p className="text">
          Among the most influential Earth observation missions is the Landsat
          programme, which has provided continuous satellite imagery of the
          Earth's surface for more than five decades. This extensive archive
          enables a spatiotemporal analysis of landscape change, allowing
          environmental processes to be observed across both space and time.
        </p>
        <h4>Study overview</h4>
        <p className="text">
          Building on this historical archive, this project examines how the Mau
          forest complex has changed over the past 25 years.
        </p>
        <p className="text">
          The year 2000 has been chosen as the baseline of this analysis. It
          marks the starting point from which changes in forest cover and land
          use can be measured.
        </p>
        <p className="text">
          To capture the progression of landscape change, observations are
          analyzed at <span className="important">5 year intervals</span>,
          allowing both gradual trends and periods of accelerated transformation
          to be identified.
        </p>
        <p className="text">
          To ensure complete spatial coverage, imagery for each observation year
          was taken between the months of January and June. The study area spans
          two overlapping landsat scenes and cloud masking often resulted in
          missing pixels within individual acquisitions. Using a 6 months
          observation window provided a sufficient number of cloud free images
          from both scenes to generate seamless composites while maintaining a
          consistent seasonal period across all years.
        </p>
      </section>
      <section className="spatial-analysis">
        <h3>25 years...</h3>
        <p className="text">
          Before beginning the analysis from our baseline, observations acquired
          prior to this provide valuable historical context. It offers a glimpse
          of the forest complex before many of the land cover changes analyzed
          in this study, serving as a visual reference against which the 21
          <sup>st</sup> century landscape can be understood.
        </p>
        <p className="text">
          A composite image generated from landsat 5 observations taken between
          1984, when it became operational and 1986, provides the earliest
          visual record used in this study. Consequently it represents the
          greatest forest extent illustrated within this project.
        </p>
        <h4>2000</h4>
      </section>
      <p className="text">
        The year 2000 marks the analytical baseline of the study. It also
        precedes the landmark 2002 general elections.
      </p>
    </main>
  );
}

export default Main;
