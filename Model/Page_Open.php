<!DOCTYPE html>
<html lang='<?= isset($lang) ? $lang : 'en' ?>'>
<head>
<title><?= isset($title) ? $title : '' ?></title>
<meta charset='<?= isset($charset) ? $charset : 'UTF-8'?>'>
<?php if(isset($metas)) foreach($metas as $meta): ?>
<meta name='<?= $meta['name'] ?>' content='<?= $meta['content'] ?>'>
<?php endforeach ?>
<?php if(isset($links)) placeLinkTags($links); ?>
<?php if(isset($scripts)) placeScriptTags($scripts); ?>
</head>
<body>
