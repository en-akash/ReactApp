import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneDropdown,

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpfxFirstReactAppWebPartStrings';
import SpfxFirstReactApp from './components/SpfxFirstReactApp';
import { ISpfxFirstReactAppProps } from './components/ISpfxFirstReactAppProps';


export interface ISpfxFirstReactAppWebPartProps {
  FirstName: string;
  LastName: string;
  Gender: string;
  Phone: string;
  Address: string;
  Percent: string;
  State: string;
  City: string;
}

export default class SpfxFirstReactAppWebPart extends BaseClientSideWebPart<ISpfxFirstReactAppWebPartProps> {



  public render(): void {
    const element: React.ReactElement<ISpfxFirstReactAppProps> = React.createElement(
      SpfxFirstReactApp,
      {
          FirstName: this.properties.FirstName,
          LastName: this.properties.LastName,
          Gender: this.properties.Gender,
          Phone: this.properties.Phone,
          Address: this.properties.Address,
          Percent: this.properties.Percent,
          State: this.properties.State,
          City: this.properties.City





      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {

    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }


    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneTextField('FirstName', {
                  label: "First Name"
                }),
                PropertyPaneTextField('LastName', {
                  label: "Last Name"
                }),
                PropertyPaneChoiceGroup('Gender', {
                  label: "Gender",
                  options: [
                    {
                      key: "Male", text: "Male"
                    },
                    {
                      key: "Female", text: "Female"
                    }
                  ]
                }),
                PropertyPaneTextField('Phone', {
                  label: "Phone",
                }),
                PropertyPaneTextField('Address', {
                  label: "Address",
                  multiline: true
                }),
                PropertyPaneSlider("Percent", {
                  label: "Percent",
                  min: 1,
                  max: 6,
                  showValue: true,
                }),
                PropertyPaneDropdown("State", {
                  label: "State",
                  options: [
                    {
                      key: '--Select State--',
                      text: '--Select State--'
                    },
                    {
                      key: 'WB',
                      text: 'WB'
                    }, {
                      key: 'UP',
                      text: 'UP'
                    }],

                }),
                PropertyPaneDropdown("City", {
                  label: "City",
                  options: [{
                    key: '--Select City--',
                    text: '--Select City--'
                  },
                    {
                    key: 'Noida',
                    text: 'Noida'
                  }, {
                    key: 'Patna',
                    text: 'Patna'
                  }],

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
