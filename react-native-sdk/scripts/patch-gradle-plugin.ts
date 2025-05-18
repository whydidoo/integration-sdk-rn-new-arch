import path from 'path';
import fs from 'fs';

const reactPluginPath = path.resolve(
  './node_modules/@react-native/gradle-plugin/react-native-gradle-plugin/src/main/kotlin/com/facebook/react/ReactPlugin.kt',
);



const addContentForLib = `
if (project.name != "app") {
  configureCodegen(project, extension, rootExtension, isLibrary = true)
}`;

function replaceInReactPlugin(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  const libContent =
    'configureCodegen(project, extension, rootExtension, isLibrary = true)';
  if (content.includes(libContent) && !content.includes(addContentForLib)) {
    const updated = content.replace(libContent, addContentForLib);

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
    }
  }

  if (content.includes('.withPlugin("com.android.application")')) {
    const updated = content.replace(
      'project.pluginManager.withPlugin("com.android.application")',
      'if (project.name == "app")',
    );

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
    }
  }
}

const removeGenerationAssetsPath = () => {
  const regex = /if\s*\(\s*!isDebuggableVariant\s*\)\s*\{[^{}]*(\{[^{}]*\}[^{}]*)*\}/gs;

  const taskConfigurationPath = path.resolve(
    './node_modules/@react-native/gradle-plugin/react-native-gradle-plugin/src/main/kotlin/com/facebook/react/TaskConfiguration.kt',
  );

  const content = fs.readFileSync(taskConfigurationPath, 'utf8');

  const updated = content.replace(regex,'');

  if (updated !== content) {
    fs.writeFileSync(taskConfigurationPath, updated, 'utf8');
  }
};

replaceInReactPlugin(reactPluginPath);
removeGenerationAssetsPath();




