<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>




<!-- PROJECT SHIELDS -->
<!--
* I'm using markdown "reference style" links for readability.
* Reference links are enclosed in brackets [ ] instead of parentheses ( ).
* See the bottom of this document for the declaration of the reference variables
* for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
* https://www.markdownguide.org/basic-syntax/#reference-style-links


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center"> Access Sync (A-Sync) </h1>

  <p align="center">
    <br />
    <!--<a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>-->
    <br />
    <a href="https://youtu.be/m3xArqbYJ1A">View Demo</a>
     <br />
    <a href="https://async-5.web.app">A-sync Deployed</a>

  </p>
</div>

<img width="1280" alt="Screenshot 2024-01-10 at 12 54 27 AM" src="https://github.com/Dragonglass101/web5-project/assets/79003706/2630a46b-506c-4451-8c95-bb3aaed30f12">


<!-- TABLE OF CONTENTS -->

  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Tech-Stack</a></li>
    <li><a href="#usage">Challenges Faced</a></li>
    <li><a href="#contributing">Future Aspects and Scope</a></li>
    <li><a href="#license">Guide to setup the project locally</a></li>
    <li><a href="#acknowledgments">Acknowledgments and References</a></li>
    <li><a href="#contact">Project Demo Pictures</a></li>
  </ol>

## About The Project

### Motivation 

Our Inspiration to embark on the Web5 project is rooted in a profound commitment to redefine the landscape of the internet, ushering in an era where users wield genuine authority over their online identities and data. At the heart of our initiative lies a dedication to the core principles of Web5, envisioning a digital realm that places a premium on user-centricity, privacy, seamless data flow, and empowerment.

Crucially, within the Web5 framework, the security and ownership of user data is priortized. With a focus on privacy, all user-generated data is now securely stored in the user's (DWN). This ensures that users have complete control and ownership over their data, granting them the authority to decide which applications can access and utilize their information. This empowerment represents a fundamental shift in how data is handled, placing the user at the center of their digital experience.

In pursuit of this vision, we have meticulously crafted A-Sync application. The application itself, has three inbuilt independent application, that leverages the power of web5 and give us glimpse of future with web5.


### Introduction

A-Sync isn't just an application; it's a visionary ecosystem that mirrors the future of the web through the lens of Web5. Comprising two autonomous applications—Fitbit (Workout Assistance) and NutriFit (Diet Assistance)—our approach distinguishes itself by seamlessly integrating these two facets. The inherent link between exercise and nutrition is addressed using our third gear, the Access Interface.

In the Web5 paradigm, user-generated data often needs to flow seamlessly between applications to enhance user experiences. With data securely residing in the user's Digital Web Node (DWN), under the user's sole control, our Fitbit and NutriFit applications break free from conventional limitations. Consider a scenario where a workout app recommends high-intensity cardio without knowledge of dietary habits. A-Sync transcends these constraints; user data from both applications is securely stored in the DWN. With user permission, Fitbit gains insights into dietary data, enabling tailored workout and meal recommendations for the next day.

This strategic collaboration, made possible by Web5, marks a departure from isolated data silos. Users benefit from a holistic approach that harmonizes exercise routines with dietary patterns, setting a new standard for user-centric technologies. A-Sync empowers users to selectively share and leverage their data across applications, ushering in a level of customization and personalization previously unimaginable. In this interconnected ecosystem, privacy, data ownership, and informed decision-making take center stage.
<img src='/src/assets/images/Architecture.png'/>
#### What's Cooking:
Fitbit and NutriFit stand independently as third-party applications, each providing features such as creating, deleting, editing, and sharing workouts or meals, along with analytics. Both applications run on their servers, and users sign in automatically with their Decentralized Identifiers (DID). By default, Fitbit has access to read Fitbit-generated data from the user's DWN, but users can grant permission to read NutriFit-generated data. The Access Manager facilitates this, offering users an intriguing UI to grant and revoke permissions. User profile information enriches the experience, envisioning a dashboard for managing identity and data across all used applications.

Note: Fitbit and NutriFit are standalone applications, and Access Manager is a user-side feature for intuitive permission management. The additional NutriFit application serves demo purposes, creating a compelling preview of our futuristic Web5 interface.

### Features

#### Grant Access Permissions 

#### Configurable Protocols: 
Enabling the dynamism of Web5 in real-life scenarios requires protocols to be adaptable, allowing users to grant or revoke permissions at any time. Our achievement lies in the implementation of dynamic protocols, stored in the user's Digital Web Node (DWN). We successfully fetch, overwrite, and update these protocols within the user's DWN, ensuring a flexible and user-centric approach to data access.

#### Assigning Roles:
Beyond utilizing default "who" attributes, we've introduced custom roles to address the structural complexity of our application. This innovation in our configurable protocols introduces new roles dynamically and adjusts permissions for all record types based on user actions. This achievement enhances the granularity of access control and ensures a tailored experience for users.

#### Share Records Tree: 
Our accomplishment extends beyond simple record sharing; we've successfully constructed a structural tree of records using parent-child relationships. This achievement signifies our capability not only to share individual records but entire hierarchical structures. The implementation of a shared records tree adds depth and complexity to data sharing within the Web5 framework.

<p align="right"><a href="#readme-top">Top</a></p>

## Challenges Faced


<p align="right"><a href="#readme-top">Top</a></p>

## Future Aspects and Scope
A-Sync, functioning as an ecosystem, features a pivotal Access Manager—an essential component for the user dashboard or wallet, centralizing Web5-related management. Fitbit, a key application in A-Sync, currently provides workout recommendations and basic analytics. Future plans involve integrating AI/ML for more advanced features, enhancing collaboration, and supporting various file formats. A-Sync aims to be a dynamic platform, empowering users in Web5 activities while fostering collaboration in the health and wellness space.

<p align="right"><a href="#readme-top">Top</a></p>


## Guide to setup the project locally
### Prerequisites

- Node v12.x +

<p align="right"><a href="#readme-top">Top</a></p>

### Setup, Run, Compile Steps :

1.  `npm install` it will install all your dependencies

2.  `npm run dev` it will run the build and run the application

> If step 2 does not work then go to the 'client' directory and run 'npm install'

3.  `npm run sync` this is a syncing command. Whenever the compile_config is changed in config.json this command must be executed from the terminal. This command helps the bundle to reconfigure the compilation parameters according to the changes you have made.

4.  `npm run compile` will build the contracts locally inside the folder ./contract_build. This command compiles the python file to a Michelson file and stores it in the ./contract_build folder.

<p align="right"><a href="#readme-top">Top</a></p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments and References

* [Web5 SDK](https://developer.tbd.website/docs/)
* [ViteJs](https://vitejs.dev/guide/o)
* [Protocol Validator](https://radiant-semifreddo-af73bb.netlify.app//)
* [ReactJs](https://reactjs.org/docs/getting-started.html)
* [README Template](https://github.com/othneildrew/Best-README-Template/edit/master/README.md)

<p align="right"><a href="#readme-top">Top</a></p>

## Project Demo Pictures
You can refer the sample shots our projects <a href="https://drive.google.com/drive/folders/1r2odEfimq4LXsX1kY54HprXF4IjTv2Tx?usp=sharing">Click Here</a>

<p align="right">(<a href="#readme-top">Top</a>)</p>
