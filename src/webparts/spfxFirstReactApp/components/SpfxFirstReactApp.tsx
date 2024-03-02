import * as React from 'react';
import styles from './SpfxFirstReactApp.module.scss';
import type { ISpfxFirstReactAppProps } from './ISpfxFirstReactAppProps';

//import { escape } from '@microsoft/sp-lodash-subset';

export default class SpfxFirstReactApp extends React.Component<ISpfxFirstReactAppProps, {}> {
  public render(): React.ReactElement<ISpfxFirstReactAppProps> {
    const {
     
    } = this.props;

    return (
      <section className={`${styles.spfxFirstReactApp} `}>
      
        {
          this.props.FirstName
        }<br></br><br></br>
        {
          this.props.LastName
        }<br></br><br></br>
         {
          this.props.Gender
        }<br></br><br></br>
         {
          this.props.Phone
        }<br></br><br></br>
         {
          this.props.Address
        }<br></br><br></br>
         {
          this.props.Percent
        }<br></br><br></br>
         {
          this.props.State
        }<br></br><br></br>
         {
          this.props.City
        }<br></br><br></br>
 
      </section>
    );
  }
}
