<?php

require_once 'civicrm_inky_compose.civix.php';

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function civicrm_inky_compose_civicrm_config(&$config) {
  _civicrm_inky_compose_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function civicrm_inky_compose_civicrm_xmlMenu(&$files) {
  _civicrm_inky_compose_civix_civicrm_xmlMenu($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function civicrm_inky_compose_civicrm_install() {
  _civicrm_inky_compose_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_postInstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_postInstall
 */
function civicrm_inky_compose_civicrm_postInstall() {
  _civicrm_inky_compose_civix_civicrm_postInstall();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function civicrm_inky_compose_civicrm_uninstall() {
  _civicrm_inky_compose_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function civicrm_inky_compose_civicrm_enable() {
  _civicrm_inky_compose_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function civicrm_inky_compose_civicrm_disable() {
  _civicrm_inky_compose_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function civicrm_inky_compose_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _civicrm_inky_compose_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function civicrm_inky_compose_civicrm_managed(&$entities) {
  _civicrm_inky_compose_civix_civicrm_managed($entities);
}

/**
 * Implements hook_civicrm_angularModules().
 *
 * Generate a list of Angular modules.
 *
 * Note: This hook only runs in CiviCRM 4.5+. It may
 * use features only available in v4.6+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules
 */
function civicrm_inky_compose_civicrm_angularModules(&$angularModules) {
  _civicrm_inky_compose_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function civicrm_inky_compose_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _civicrm_inky_compose_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

function civicrm_inky_compose_civicrm_alterAngular($angular){
  $changeSet = \Civi\Angular\ChangeSet::create('inky_compose')
    ->alterHtml('~/crmMailing/EditMailingCtrl/2step.html',
      function (phpQueryObject $doc) {
        $doc->find('div#tab-mailing div:nth-child(3), div#tab-mailing div:nth-child(4)')->remove();
        $doc->find('div#tab-mailing')->append('<crm-mailing-inky-compose mailing="mailing"></crm-mailing-inky-compose>');
    })
    ->alterHtml('~/crmMailing/BlockPreview.html',
      function (phpQueryObject $doc) {
        $doc->find('.preview-popup')->remove();
    });
  $angular->add($changeSet);
}
