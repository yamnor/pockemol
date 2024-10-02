# PockeMol: A Web-based Molecular Viwer 🐿️

Try it at [pockemol.yamnor.me](https://pockemol.yamnor.me)!

## Overview

PockeMol is an easy-to-use web application designed for visualizing and sharing molecular structures.

![](https://i.gyazo.com/2f67a84fecbf59c2c52b142010b97d0d.gif)

## Background

PockeMol was created to address the need for an easy-to-use, shareable molecular visualization tool. By leveraging client-side technologies, it provides a secure and efficient way for chemists, researchers, and students to view and share molecular structures without the need for server-side processing or data storage.

## Key Features

1. **Easy Visualization**: Quickly view 3D molecular structures from XYZ coordinate data.
2. **Data Sharing**: Generate shareable URLs containing molecular structural data.
3. **Server-less Operation**: Works entirely client-side, ensuring data privacy and easy sharing.

## How to Use PockeMol

1. **Data Mode**:

   - Enter XYZ coordinate data for your molecule.
   - The app validates the input to ensure it's proper XYZ data.

2. **View Mode**:

   - Switch to this mode to see a 3D visualization of the molecule.
   - The molecule is rendered using the 3Dmol.js library.

3. **Link Button**:

   - Generate a URL containing the encoded molecular data.
   - The URL is automatically copied to the clipboard for easy sharing.

4. **Info Button**:

   - Access information about the app and its creator.

## Technical Details

### Core Technologies

1. **3Dmol.js**: This JavaScript library is used for molecular visualization, allowing for interactive 3D rendering of molecules.

2. **LZ-String**: This compression library is used to encode and decode molecular data in URLs, enabling efficient data sharing.

### Data Handling

- The app uses URL hash fragments to store and retrieve molecular data.
- Molecular data is compressed and encoded using LZ-String before being added to the URL.

## About the Developer

**PockeMol** was created by [yamnor](https://yamnor.me), a chemist specializing in molecular simulation living in Japan. If you have any questions, thoughts, or comments, feel free to [contact me 📧](https://letterbird.co/yamnor) or find me on [X (Twitter) 🐦](https://x.com/yamnor).
