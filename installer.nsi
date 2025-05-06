[Setup]
AppName=MyNodeReactApp
AppVersion=1.0
DefaultDirName={pf}\MyNodeReactApp
DefaultGroupName=MyNodeReactApp
OutputBaseFilename=MyNodeReactAppSetup
Compression=lzma
SolidCompression=yes

[Files]
Source: "path\to\project-installer.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "path\to\node_modules"; DestDir: "{app}\node_modules"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{group}\MyNodeReactApp"; Filename: "{app}\project-installer.exe"

[Run]
Filename: "{app}\project-installer.exe"; WorkingDir: "{app}"
