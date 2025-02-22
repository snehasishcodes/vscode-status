<img src="https://i.imgur.com/DBBj53v.png" alt="VSCode Status Banner" width="500" />

# 🔗 Export your [Visual Studio Code](https://code.visualstudio.com) Activity to a REST API. 

A Visual Studio Code **extension** that makes it easy for you to export and display your current (and recent) workspace and file details. No authentication required, just simply download the extension and you're all set. See exported workspace and file details [here]().

For example: I use it to display my current activity on my [github profile](https://github.com/snehasishcodes/)

<img src="https://i.imgur.com/I01rcY8.png" alt="VSCode Status on my github profile" style="width:fit;height:fit;max-height:250px;" />

---

# Getting Started

You can download the **VSCode Status** extension by [snehasishcodes](https://snehasish.xyz) from the Visual Studio Marketplace.

### [Download the Extension](https://vscode.snehasish.xyz)

<img src="https://i.imgur.com/M4bofdt.png" alt="Extension preview" style="width:fit;height:fit;max-height:250px;" />

## Table of Contents

- [Extension Guide](#extension-guide)
    - [Activating the extension](#activating-the-extension)
    - [Getting your API endpoint](#getting-your-api-endpoint)
- [API Guide](#api-guide)
    - [API Base URL](#api-base-url)
    - [API Endpoints](#api-endpoints)
        - [GET User](#get-user)
        - [GET User SVG](#get-user-svg)
- [Extension Not Working](#support)
- [Create a project](#create-a-project)
- [Self-hosting](#self-hosting)
- [Support](#support)
- [Sponsor this project](#sponsor)

## Extension Guide

### Activating the extension

The extension activates automatically once you download it (usual behaviour) and everytime you open VSCode. \
Once the extension starts it should give you the following notification.

<img src="https://i.imgur.com/lCu8utW.png" alt="Extension activation notification" style="width:fit;height:fit;max-height:125px;" />

And you should be able to see the following button on your VSCode Status Bar.

<img src="https://i.imgur.com/E8im5ht.png" alt="Extension status bar button preview" style="width:fit;height:fit;max-height:75px;" />

If it didn't behave as usual, please reach us at [support](#support).

---

### Getting your API endpoint

You can click on either of the "Open API Endpoint" button on the extension's activation notification or the "Active" button on the Status bar. \
This will open your API Endpoint URL in the browser.

<img src="https://i.imgur.com/lCu8utW.png" alt="Extension activation notification" style="width:fit;height:fit;max-height:125px;" />
<img src="https://i.imgur.com/E8im5ht.png" alt="Extension status bar button preview" style="width:fit;height:fit;max-height:75px;" />

**OR**

Open the VSCode Status Extension Settings (UI) and **COPY THE UID (Unique ID)**

<img src="https://i.imgur.com/rK8sjsR.png" alt="Extension settings preview" height="300" />

You can then replace your UID in the following URL.

```
https://vscode.snehasish.xyz/api/users/:YOUR_UID
```

## API Guide

### API Base URL
```
https://vscode.snehasish.xyz/api/
```

### API Endpoints

#### GET User
```
GET /users/:uid
```

Returns current and most recent activity of user with the specified UID.

**Example Response**

```
GET /users/17402284804991245448
```

```json
{
    "id": "17402284804991245448",
    "current": {
        "started": "2025-02-22T12:49:31.461Z",
        "file": {
            "name": "README",
            "extension": "md",
            "path": "e:\\projects\\vscode-status\\README.md",
            "language": "markdown",
            "size": "7.51 KB",
            "lines": 214,
            "position": {
                "line": 0,
                "column": 0
            },
            "errors": 0
        },
        "workspace": {
            "name": "vscode-status",
            "path": "e:\\projects\\vscode-status"
        },
        "debugging": false
    },
    "recent": {
        "started": "2025-02-22T12:49:31.461Z",
        "file": {
            "name": "README",
            "extension": "md",
            "path": "e:\\projects\\vscode-status\\README.md",
            "language": "markdown",
            "size": "7.52 KB",
            "lines": 214,
            "position": {
                "line": 48,
                "column": 130
            },
            "errors": 0
        },
        "workspace": {
            "name": "vscode-status",
            "path": "e:\\projects\\vscode-status"
        },
        "debugging": false
    },
    "updated": "2025-02-22T12:48:00.499Z",
    "created": "2025-02-22T12:48:00.499Z"
}
```

#### Get User SVG 

Returns the specified user's information in SVG with customizable lines and fields. For example: to directly embed it as image or iframe into your website.

**Query Parameters**
- `line1` : First line of text
- `line2` : Second line of text
- `line3` : Third line of text
- `line4` : Fourth line of text

All of the above params are optional.

**Custom Fields & Values**

| Fields    | Values |
| -------- | ------- |
| `{file}`  | File name along with extension. Example: `index.js` |
| `{fileName}`  | File name without extension. Example: `index` |
| `{fileExtension}`  | File extension. Example: `js` |
| `{filePath}`  | Path to the file. Example: `e:\\projects\\vscode-status\\index.js` |
| `{language}`  | File language. Example: `javascript` |
| `{size}`  | File size in KB. Example: `5.75 KB` |
| `{lines}`  | Total lines in file. Example: `95` |
| `{currentLine}`  | Line position in file. Example: `12` |
| `{currentCol}`  | Column position in current line. Example: `34` |
| `{errors}`  | Total errors in the workspace. Example: `4` |
| `{workspaceName}`  | Name of the current workspace. Example: `vscode-status` |
| `{workspacePath}`  | Path to the current workspace. Example: `e:\\projects\\vscode-status` |
| `{debugging}`  | Current debugging status (`Yes / No`). Example: `No` |
| `{startedTimestamp}`  | Timestamp for when the activity was started. Example: `1735137118372` |
| `{endedTimestamp}`  | Timestamp for when (if) the activity ended. Example: `1735140603496` |
| `{elapsedTime}`  | (Formatted) Total activity time in the current workspace. Example: `1h 4m` |

**Example Response**

```
GET /users/17402284804991245448/svg?line1={file}+|+{size}&line3=on+{workspaceName}&line4=for+{elapsedTime}
```

<img src="https://i.imgur.com/mLGz2gf.png" alt="Get User SVG Example" height="300" />

## Create a Project

Create any project that uses the VSCode Status API and we'll list it on this README! \
For submissions [join our Discord Server](https://discord.gg/K6k6ebkJkx) 

## Support

Something isn't working? Uh oh! We've got your back. \
You can reach out for help on:

- [Discord Server](https://discord.gg/K6k6ebkJkx) (Quick response)
- [Instagram DM](https://instagram.com/snehasish) (Quicker response)
- [Email snehasish](mailto:snehasishcodes@gmail.com) (Might take a day)
- [Or open an issue](https://github.com/snehasishcodes/vscode-status/issues/new) (Might take a day)


## Self Hosting

Self hosting guide will be coming soon! Join our [Discord](#support) for future updates

## Sponsor

Well, I'm just a high school student creating stuff part-time but anyways. You can sponsor me (or this proj) here:
- [Buy Me a Coffee](https://buymeacoffee.com/snehasish)
- UPI: `snehasishcodes@oksbi`