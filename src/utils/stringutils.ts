import * as yaml from "js-yaml";
import * as vscode from 'vscode';
import fs = require('fs');

export function camelize(str: String) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function pascalize(str: String) {
    return `${str}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}


export function getPackageName() {
    if (vscode.workspace.workspaceFolders !== undefined) {
        try {
            let doc = yaml.load(fs.readFileSync(`${vscode.workspace.workspaceFolders[0].uri.path}/pubspec.yaml`, 'utf8'));
            if (doc === undefined) {
                doc = yaml.load(fs.readFileSync(`${vscode.workspace.workspaceFolders[0].uri.path}/pubspec.yml`, 'utf8'));
            }
            return Object(doc)['name'];
        } catch (error) {
            throw new Error("Please open a workspace");
        }
    } else {
        throw new Error("Please open a workspace");
    }
}
